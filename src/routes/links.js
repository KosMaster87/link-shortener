/**
 * @fileoverview Route-Handler für Link-Verwaltung
 * @description Behandelt GET /api/links, POST /api/links und
 *   DELETE /api/links/:code. Wandelt Service-Results in HTTP-Antworten um.
 * @module src/routes/links
 */
import {
  createLink,
  deleteLink,
  getAllLinks,
} from "../services/link-service.js";

const ERROR_STATUS = { INVALID_URL: 422, SLUG_TAKEN: 409, NOT_FOUND: 404 };

/**
 * Sendet eine JSON-Antwort mit dem angegebenen Status-Code.
 * @param {import("node:http").ServerResponse} res - HTTP-Response
 * @param {number} status - HTTP-Statuscode
 * @param {*} data - Zu serialisierendes Payload
 * @returns {void}
 */
const send = (res, status, data) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

/**
 * @param {import("node:http").ServerResponse} res
 * @returns {Promise<void>}
 */
const handleGet = async (res) => {
  const result = await getAllLinks();
  return send(res, 200, result.data);
};

/**
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 * @returns {Promise<void>}
 */
const handlePost = async (req, res) => {
  const result = await createLink(req.body);
  if (!result.success)
    return send(res, ERROR_STATUS[result.error], { error: result.error });
  return send(res, 201, result.data);
};

/**
 * @param {import("node:http").ServerResponse} res
 * @param {string} code - Short-Link-Code
 * @returns {Promise<void>}
 */
const handleDelete = async (res, code) => {
  const result = await deleteLink(code);
  if (!result.success)
    return send(res, ERROR_STATUS[result.error], { error: result.error });
  res.writeHead(204);
  return res.end();
};

/**
 * Verarbeitet alle Link-Endpunkte (GET, POST, DELETE).
 * @param {import("node:http").IncomingMessage} req - HTTP-Request
 * @param {import("node:http").ServerResponse} res - HTTP-Response
 * @param {{ code?: string }} params - Route-Parameter (code nur bei DELETE)
 * @returns {Promise<void>}
 */
export const handleLinks = async (req, res, params) => {
  if (req.method === "GET") return handleGet(res);
  if (req.method === "POST") return handlePost(req, res);
  if (req.method === "DELETE") return handleDelete(res, params.code);
};
