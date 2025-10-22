import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getCurrencyPosition,
  getCurrencySymbol,
  settingsData,
} from "@/redux/reducer/settingSlice";
import { generateSlug, t } from "@/utils";
import { useSelector } from "react-redux";
const EditComponentOne = ({
  setTranslations,
  current,
  langId,
  defaultLangId,
  handleDetailsSubmit,
  is_job_category,
  isPriceOptional,
}) => {
  const currencyPosition = useSelector(getCurrencyPosition);
  const currencySymbol = useSelector(getCurrencySymbol);
  const placeholderLabel =
    currencyPosition === "right"
      ? `00 ${currencySymbol}`
      : `${currencySymbol} 00`;

  const handleField = (field) => (e) => {
    const value = e.target.value;
    setTranslations((prev) => {
      const updatedLangData = {
        ...prev[langId],
        [field]: value,
      };

      // ✅ Only auto-generate slug if default language and field is title
      if (field === "name" && langId === defaultLangId) {
        updatedLangData.slug = generateSlug(value);
      }

      return {
        ...prev,
        [langId]: updatedLangData,
      };
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="title"
          className={langId === defaultLangId ? "requiredInputLabel" : ""}
        >
          {t("title")}
        </Label>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder={t("enterTitle")}
          value={current.name || ""}
          onChange={handleField("name")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="description"
          className={langId === defaultLangId ? "requiredInputLabel" : ""}
        >
          {t("description")}
        </Label>
        <Textarea
          name="description"
          id="description"
          placeholder={t("enterDescription")}
          value={current.description || ""}
          onChange={handleField("description")}
        />
      </div>

      {langId === defaultLangId && (
        <>
          {is_job_category ? (
            <>
              <div className="flex flex-col gap-2">
                <Label htmlFor="min_salary">{t("salaryMin")}</Label>
                <Input
                  type="number"
                  name="min_salary"
                  id="min_salary"
                  placeholder={placeholderLabel}
                  value={current.min_salary || ""}
                  onChange={handleField("min_salary")}
                  min={0}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="max_salary">{t("salaryMax")}</Label>
                <Input
                  type="number"
                  name="max_salary"
                  id="max_salary"
                  placeholder={placeholderLabel}
                  value={current.max_salary || ""}
                  onChange={handleField("max_salary")}
                  min={0}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="price"
                className={
                  !isPriceOptional && langId === defaultLangId
                    ? "requiredInputLabel"
                    : ""
                }
              >
                {t("price")}
              </Label>
              <Input
                type="number"
                name="price"
                id="price"
                placeholder={placeholderLabel}
                value={current.price || ""}
                onChange={handleField("price")}
                min={0}
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="phonenumber"
              className={langId === defaultLangId ? "requiredInputLabel" : ""}
            >
              {t("phoneNumber")}
            </Label>
            <Input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder={t("enterPhoneNumber")}
              pattern="[0-9]{10}"
              value={current.contact || ""}
              onChange={handleField("contact")}
              min={0}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="videoLink">{t("videoLink")}</Label>
            <Input
              type="text"
              name="videoLink"
              id="videoLink"
              placeholder={t("enterAdditionalLinks")}
              value={current.video_link || ""}
              onChange={handleField("video_link")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="slug">
              {t("slug")}{" "}
              <span className="text-sm text-muted-foreground">
                ({t("allowedSlug")})
              </span>
            </Label>
            <Input
              type="text"
              name="slug"
              id="slug"
              placeholder={t("enterSlug")}
              onChange={handleField("slug")}
              value={current.slug || ""}
            />
          </div>
        </>
      )}

      <div className="flex justify-end">
        <button
          className="bg-primary text-white  px-4 py-2 rounded-md text-xl"
          onClick={handleDetailsSubmit}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default EditComponentOne;
