import React from "react";
import { useTranslation } from "react-i18next";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import { useSettings } from "../../hooks/useSettings";

interface DictationModeProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const DictationMode: React.FC<DictationModeProps> = React.memo(
  ({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();

    const dictationEnabled = getSetting("dictation_mode") || false;
    const pushToTalk = getSetting("push_to_talk") || false;

    const handleChange = async (enabled: boolean) => {
      await updateSetting("dictation_mode", enabled);
      if (enabled && pushToTalk)
        await updateSetting("push_to_talk", false);
    };

    return (
      <ToggleSwitch
        checked={dictationEnabled}
        onChange={handleChange}
        isUpdating={isUpdating("dictation_mode")}
        label={t("settings.general.dictationMode.label")}
        description={t("settings.general.dictationMode.description")}
        descriptionMode={descriptionMode}
        grouped={grouped}
      />
    );
  },
);
