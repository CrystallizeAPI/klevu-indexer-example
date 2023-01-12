import pkg from 'jstoxml';

export default async (sessionId: string, records: any[], isUpdate: boolean) => {
    const { toXML } = pkg;
    const payload = toXML(
        {
            request: {
                sessionId,
                records
            }
        },
        {
            header: true,
            indent: '    '
        });
    const response = await fetch(`${process.env.SYNC_URL}/rest/service/${isUpdate ? 'updateRecords' : 'addRecords'}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/xml',
            'Authorization': `${process.env.API_KEY}`,
        },
        body: payload
    });

    console.log(payload);
    return await response.text();
}
