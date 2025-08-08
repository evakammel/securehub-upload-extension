import { createNodeDescriptor, INodeFunctionBaseParams } from "@cognigy/extension-tools";
import axios from "axios";

export interface ISecureHubUploadParams extends INodeFunctionBaseParams {
    config: {
        folderName: string;
        baseUrl: string;
        username: string;
        password: string;
        rejectUnauthorized: boolean;
        linkExpiryDays: number;
    };
    input: {
        fileUrl: string;
        fileName: string;
    };
}

export const secureHubUploadNode = createNodeDescriptor({
    type: "securehub-upload",
    defaultLabel: "SecureHub Upload",
    summary: "Uploads a file to SecureHub",
    fields: [
        {
            key: "folderName",
            label: "Ordnername",
            type: "text",
            required: true
        },
        {
            key: "baseUrl",
            label: "Base URL (ohne https://)",
            type: "text",
            required: true
        },
        {
            key: "username",
            label: "Benutzername",
            type: "text",
            required: true
        },
        {
            key: "password",
            label: "Passwort",
            type: "password",
            required: true
        },
        {
            key: "rejectUnauthorized",
            label: "Nicht autorisierte Zertifikate ablehnen",
            type: "toggle",
            defaultValue: false
        },
        {
            key: "linkExpiryDays",
            label: "Linkablauf in Tagen",
            type: "number",
            defaultValue: 3
        }
    ],
    form: [
        { type: "section", key: "connection", label: "Verbindung", elements: ["baseUrl", "username", "password"] },
        { type: "section", key: "settings", label: "Einstellungen", elements: ["folderName", "rejectUnauthorized", "linkExpiryDays"] }
    ],
    appearance: {
        color: "#0070f3"
    },
    async function ({ config, input, api }: ISecureHubUploadParams) {
        const { folderName, baseUrl, userna
