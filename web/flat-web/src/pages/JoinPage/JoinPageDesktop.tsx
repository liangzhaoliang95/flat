/* eslint react/jsx-no-target-blank: off */

import joinSVG from "./icons/join.svg";

import React, { useMemo } from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

export interface JoinPageDesktopProps {
    isLogin: boolean;
    avatar: string;
    roomUUID: string;
    privacyURL: string;
    serviceURL: string;
    joinRoom: () => void;
}

export default function JoinPageDesktop({
    roomUUID,
    joinRoom,
}: JoinPageDesktopProps): React.ReactElement {
    const { t } = useTranslation();

    const url = useMemo(() => `x-agora-flat-client://joinRoom?roomUUID=${roomUUID}`, [roomUUID]);

    return (
        <div className="join-page-container">
            <iframe height="0" src={url} style={{ display: "none" }} title="[hidden]" width="0" />
            <div className="join-page-content-container">
                <div className="join-page-content-title">{t("select-the-way-to-join-room")}</div>
                <div className="join-page-content-btn-container">
                    <Button className="join-page-content-btn" onClick={joinRoom}>
                        <img alt="join icon" src={joinSVG} />
                        <div className="join-page-content-text-container">
                            <div className="join-page-content-text">
                                {t("web-version-join-room")}
                            </div>
                            <span className="join-page-content-sub-text">
                                {t("web-version-join-room-tips")}
                            </span>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
}
