export default async () => {
    const response = await fetch(`${process.env.SYNC_URL}/rest/service/startSession`, {
        method: 'POST',
        headers: {
            'Authorization': `${process.env.API_KEY}`,
        }
    });

    const xml = await response.text();
    let startIndex = xml.indexOf("<sessionId>") + "<sessionId>".length;
    let endIndex = xml.indexOf("</sessionId>");
    return xml.substring(startIndex, endIndex);
}
