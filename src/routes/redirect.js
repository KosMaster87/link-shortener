/**
 * @fileoverview Route-Handler für URL-Weiterleitungen
 * @description Löst einen 6-stelligen Short-Code zur Original-URL auf,
 *   zeichnet den Klick auf und sendet einen 302-Redirect.
 * @module src/routes/redirect
 */
import { recordClick } from "../services/analytics-service.js";
import { getLink } from "../services/link-service.js";

/**
 * Sendet eine JSON-Antwort.
 * @param {import("node:http").ServerResponse} res
 * @param {number} status - HTTP-Statuscode
 * @param {*} data - Zu serialisierendes Payload
 * @returns {void}
 */
const sendJson = (res, status, data) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

/**
 * Leitet einen Short-Link-Aufruf zur Original-URL weiter und trackt den Klick.
 * @param {import("node:http").IncomingMessage} req - HTTP-Request
 * @param {import("node:http").ServerResponse} res - HTTP-Response
 * @param {{ code: string }} params - Route-Parameter mit dem Link-Code
 * @returns {Promise<void>}
 */
export const handleRedirect = async (req, res, params) => {
  const result = await getLink(params.code);
  if (!result.success) return sendJson(res, 404, { error: "NOT_FOUND" });

  await recordClick({
    code: params.code,
    referrer: req.headers["referer"] ?? null,
    userAgent: req.headers["user-agent"] ?? null,
  });

  res.writeHead(302, { Location: result.data.originalUrl });
  res.end();
};
