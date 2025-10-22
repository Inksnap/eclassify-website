import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getCurrencyPosition,
  getCurrencySymbol,
} from "@/redux/reducer/settingSlice";
import { generateSlug, t } from "@/utils";
import { useSelector } from "react-redux";

const ComponentTwo = ({
  setTranslations,
  current,
  langId,
  handleDetailsSubmit,
  handleDeatilsBack,
  is_job_category,
  isPriceOptional,
  defaultLangId,
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
    <div className="flex flex-col w-full gap-6">
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
          onChange={handleField("name")} //here send param as the one we need to send to the api
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
          cols="30"
          rows="3"
          placeholder={t("enterDescription")}
          className="border rounded-md px-4 py-2 outline-none"
          value={current.description || ""}
          onChange={handleField("description")}
        ></Textarea>
      </div>

      {/* Render the rest only for default language */}
      {langId === defaultLangId && (
        <>
          {is_job_category ? (
            <>
              <div className="flex flex-col gap-2">
                <Label htmlFor="salaryMin">{t("salaryMin")}</Label>
                <Input
                  type="number"
                  name="salaryMin"
                  id="salaryMin"
                  min={0}
                  placeholder={placeholderLabel}
                  value={current.min_salary || ""}
                  onChange={handleField("min_salary")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="salaryMax">{t("salaryMax")}</Label>
                <Input
                  type="number"
                  min={0}
                  name="salaryMax"
                  id="salaryMax"
                  placeholder={placeholderLabel}
                  value={current.max_salary || ""}
                  onChange={handleField("max_salary")}
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
                min={0}
                placeholder={placeholderLabel}
                value={current.price || ""}
                onChange={handleField("price")}
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
              placeholder={t("phoneNumber")}
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
              <span className="text-muted-foreground text-xs">
                ({t("allowedSlug")})
              </span>
            </Label>
            <Input
              type="text"
              name="slug"
              id="slug"
              placeholder={t("enterSlug")}
              value={current.slug || ""}
              onChange={handleField("slug")}
            />
          </div>
        </>
      )}
      <div className="flex justify-end gap-3">
        <button
          className="bg-black text-white px-4 py-2 rounded-md text-xl font-light"
          onClick={handleDeatilsBack}
        >
          {t("back")}
        </button>
        <button
          className="bg-primary text-white  px-4 py-2 rounded-md text-xl font-light"
          onClick={handleDetailsSubmit}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default ComponentTwo;
