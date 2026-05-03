/**
 * Opens the printable laboratory report slip in a new browser tab.
 * Mock data is rendered on the slip page until backend wiring exists.
 * Use autoprint to open the system print dialog (user can choose "Save as PDF").
 */
export function useLabReportSlip() {
  function openSlipNewTab(options = {}) {
    if (!import.meta.client) {
      return
    }
    const path = '/print/lab-report-slip'
    const qs = options.autoprint ? '?autoprint=1' : ''
    const url = `${window.location.origin}${path}${qs}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return { openSlipNewTab }
}
