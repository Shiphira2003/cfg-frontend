import api from "./axios";

export const getAuditLogs = async (applicationId: number) => {
    const res = await api.get(
        `/applications/${applicationId}/audit-logs`
    );

    return res.data.audit_logs;
};
