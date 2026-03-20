/**
 * @fileoverview Result-Helper für einheitliches Error Handling
 * @description Stellt ok/err Factory-Funktionen bereit, sodass Services
 *   immer ein einheitliches Result-Objekt zurückgeben statt Exceptions zu werfen.
 * @module src/utils/result
 */

/**
 * Erzeugt ein erfolgreiches Result-Objekt.
 * @param {*} data - Nutzdaten des Ergebnisses
 * @returns {{ success: true, data: * }}
 */
export const ok = (data) => ({ success: true, data });

/**
 * Erzeugt ein fehlgeschlagenes Result-Objekt.
 * @param {string} error - Fehler-Code (z.B. "NOT_FOUND", "INVALID_URL")
 * @returns {{ success: false, error: string }}
 */
export const err = (error) => ({ success: false, error });
