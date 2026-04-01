import React from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "../ui/Slider";
import { useSettings } from "../../hooks/useSettings";

interface DictationSilenceProps {
  descriptionMode?: "tooltip" | "inline";
  grouped?: boolean;
  disabled?: boolean;
}

export const DictationSilence: React.FC<DictationSilenceProps> = ({
  descriptionMode = "tooltip",
  grouped = false,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const { settings, updateSetting } = useSettings();

  const handleChange = (value: number) => {
    updateSetting("dictation_silence_ms", value);
  };

  return (
    <Slider
      value={settings?.dictation_silence_ms ?? 3000}
      onChange={handleChange}
      min={500}
      max={5000}
      step={250}
      label={t("settings.general.dictationSilence.title")}
      description={t("settings.general.dictationSilence.description")}
      descriptionMode={descriptionMode}
      grouped={grouped}
      formatValue={(v) => `${(v / 1000).toFixed(1)}s`}
      disabled={disabled}
    />
  );
};
