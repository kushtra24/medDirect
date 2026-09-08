<template>
  <div ref="mapEl" class="absolute inset-0" />
</template>

<script setup>
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

const props = defineProps({
  institutes: { type: Array, default: () => [] },
  selectedSlug: { type: [String, null], default: null },
})

const emit = defineEmits(['select'])

const { t } = useI18n()

// Central Baghdad — used whenever there are no plottable clinics yet.
const BAGHDAD_CENTER = [33.3152, 44.3661]
const DEFAULT_ZOOM = 12

const mapEl = ref(null)

let L = null
let map = null
let clusterGroup = null
const markersBySlug = new Map()

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char])
}

function buildIcon(active) {
  return L.divIcon({
    className: `clinic-marker-wrapper${active ? ' clinic-marker-wrapper--active' : ''}`,
    html: '<div class="clinic-marker"><span class="clinic-marker__dot"></span></div>',
    iconSize: [30, 38],
    iconAnchor: [15, 38],
    popupAnchor: [0, -34],
  })
}

function popupHtml(item) {
  const statusLabel = item.isOpen
    ? t('clinicCard.openNow')
    : t('clinicCard.closedOpens', { time: item.openTime ?? '—' })

  return `
    <div class="clinic-popup">
      <p class="clinic-popup__name">${escapeHtml(item.name)}</p>
      ${item.address ? `<p class="clinic-popup__address">${escapeHtml(item.address)}</p>` : ''}
      <p class="clinic-popup__status ${item.isOpen ? 'is-open' : 'is-closed'}">${escapeHtml(statusLabel)}</p>
    </div>
  `
}

function plottablePoints() {
  return props.institutes.filter(
    (item) => typeof item.latitude === 'number' && typeof item.longitude === 'number',
  )
}

function rebuildMarkers() {
  if (!map || !clusterGroup) {
    return
  }

  clusterGroup.clearLayers()
  markersBySlug.clear()

  const points = plottablePoints()

  for (const item of points) {
    const marker = L.marker([item.latitude, item.longitude], {
      icon: buildIcon(item.slug === props.selectedSlug),
    })
    marker.bindPopup(popupHtml(item))
    marker.on('click', () => emit('select', item.slug))
    markersBySlug.set(item.slug, marker)
    clusterGroup.addLayer(marker)
  }

  if (points.length) {
    const bounds = L.latLngBounds(points.map((item) => [item.latitude, item.longitude]))
    map.fitBounds(bounds, { padding: [56, 56], maxZoom: 15 })
  }
  else {
    map.setView(BAGHDAD_CENTER, DEFAULT_ZOOM)
  }
}

function focusMarker(slug) {
  const marker = markersBySlug.get(slug)
  if (!marker || !clusterGroup) {
    return
  }
  // Only pop it open if it's currently rendered as its own pin (not folded into a cluster) —
  // avoids the map jumping around every time the user just hovers a list item.
  if (clusterGroup.getVisibleParent(marker) === marker) {
    marker.openPopup()
  }
}

onMounted(async () => {
  const leafletModule = await import('leaflet')
  L = leafletModule.default ?? leafletModule
  await import('leaflet.markercluster')

  map = L.map(mapEl.value, {
    center: BAGHDAD_CENTER,
    zoom: DEFAULT_ZOOM,
    zoomControl: false,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
  }).addTo(map)

  clusterGroup = L.markerClusterGroup({
    maxClusterRadius: 60,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    iconCreateFunction: (cluster) => L.divIcon({
      className: 'clinic-cluster-wrapper',
      html: `<div class="clinic-cluster">${cluster.getChildCount()}</div>`,
      iconSize: [40, 40],
    }),
  })
  map.addLayer(clusterGroup)

  rebuildMarkers()
})

onBeforeUnmount(() => {
  map?.remove()
  map = null
  clusterGroup = null
  markersBySlug.clear()
})

watch(() => props.institutes, rebuildMarkers)

watch(() => props.selectedSlug, (next, prev) => {
  if (!L) {
    return
  }
  if (prev && markersBySlug.has(prev)) {
    markersBySlug.get(prev).setIcon(buildIcon(false))
  }
  if (next && markersBySlug.has(next)) {
    markersBySlug.get(next).setIcon(buildIcon(true))
    focusMarker(next)
  }
})

function zoomIn() {
  map?.zoomIn()
}

function zoomOut() {
  map?.zoomOut()
}

function locateMe() {
  if (!map || !navigator.geolocation) {
    return
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      map.setView([position.coords.latitude, position.coords.longitude], 15)
    },
    () => {
      // Permission denied or unavailable — fall back silently, the map already shows Baghdad.
    },
    { enableHighAccuracy: true, timeout: 8000 },
  )
}

defineExpose({ zoomIn, zoomOut, locateMe })
</script>

<style>
.clinic-marker-wrapper {
  background: transparent;
  border: none;
}

.clinic-marker {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  background: #3a5f94;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.clinic-marker-wrapper--active .clinic-marker {
  transform: rotate(-45deg) scale(1.15);
  box-shadow: 0 0 0 4px rgba(58, 95, 148, 0.25), 0 2px 6px rgba(0, 0, 0, 0.35);
}

.clinic-marker__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffffff;
  transform: rotate(45deg);
}

.clinic-cluster-wrapper {
  background: transparent;
  border: none;
}

.clinic-cluster {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(58, 95, 148, 0.9);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 0 0 6px rgba(58, 95, 148, 0.2);
}

.clinic-popup {
  min-width: 160px;
}

.clinic-popup__name {
  margin: 0 0 2px;
  font-weight: 700;
  font-size: 14px;
  color: #3a5f94;
}

.clinic-popup__address {
  margin: 0 0 4px;
  font-size: 12px;
  color: #444748;
}

.clinic-popup__status {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
}

.clinic-popup__status.is-open {
  color: #0d9488;
}

.clinic-popup__status.is-closed {
  color: #ba1a1a;
}

.leaflet-container {
  font-family: inherit;
}
</style>
