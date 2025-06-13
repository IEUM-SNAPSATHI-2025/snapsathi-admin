import FormField from "@/components/FormField";
import FormFieldGroup from "@/components/FormFieldGroup";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";

export default function ReservationForm({ reservation, isEdit, onChange }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <FormField label="예약번호" htmlFor="reservation-number">
          <Input
            id="reservation-number"
            name="reservation_number"
            value={reservation.reservation_number ?? 0}
            disabled
            readOnly
          />
        </FormField>
        <FormField label="예약 상태" htmlFor="reservation-status">
          <select
            id="reservation-status"
            name="status"
            value={reservation.status ?? ""}
            onChange={(e) => onChange("status", e.target.value)}
            disabled={!isEdit}
            className="w-full rounded-lg border border-gray-300 p-3 text-sm font-normal text-gray-900 focus:border-[#5C73DB] focus:outline-none"
          >
            <option value="confirmed">확정 (confirmed)</option>
            <option value="unconfirmed">미확정 (unconfirmed)</option>
          </select>
        </FormField>
        <FormField label="이름" htmlFor="reservation-name">
          <Input
            id="reservation-name"
            name="name"
            value={reservation.name ?? ""}
            onChange={(e) => onChange("name", e.target.value)}
            disabled={!isEdit}
          />
        </FormField>
        <FormField label="번호" htmlFor="reservation-whatsapp">
          <Input
            id="reservation-whatsapp"
            name="whatsapp"
            value={reservation.whatsapp ?? ""}
            onChange={(e) => onChange("whatsapp", e.target.value)}
            disabled={!isEdit}
          />
        </FormField>
        <FormField label="이메일" htmlFor="reservation-email">
          <Input
            id="reservation-email"
            name="email"
            value={reservation.email ?? ""}
            onChange={(e) => onChange("email", e.target.value)}
            disabled={!isEdit}
          />
        </FormField>
        <FormField label="이벤트 날짜" htmlFor="reservation-event-date">
          <Input
            id="reservation-event-date"
            name="event_date"
            value={reservation.event_date ?? ""}
            onChange={(e) => onChange("event_date", e.target.value)}
            disabled={!isEdit}
          />
        </FormField>
        <FormField label="이벤트 장소" htmlFor="reservation-location">
          <Input
            id="reservation-location"
            name="location"
            value={reservation.location ?? ""}
            onChange={(e) => onChange("location", e.target.value)}
            disabled={!isEdit}
          />
        </FormField>
        <FormField label="서비스 시간" htmlFor="reservation-service-hours">
          <Input
            id="reservation-service-hours"
            name="service_hours"
            value={reservation.service_hours ?? ""}
            onChange={(e) => onChange("service_hours", e.target.value)}
            disabled={!isEdit}
          />
        </FormField>
        <FormField label="테마" htmlFor="reservation-theme">
          <select
            id="reservation-theme"
            name="theme"
            value={reservation.theme ?? ""}
            onChange={(e) => onChange("theme", e.target.value)}
            disabled={!isEdit}
            className="w-full rounded-lg border border-gray-300 p-3 text-sm font-normal text-gray-900 focus:border-[#5C73DB] focus:outline-none"
          >
            <option value="Wedding">Wedding</option>
            <option value="Birthday">Birthday</option>
            <option value="Baby Shower">Baby Shower</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Other">Other</option>
          </select>
        </FormField>
        <FormField label="이벤트명" htmlFor="reservation-event-name">
          <Input
            id="reservation-event-name"
            name="event_name"
            value={reservation.event_name ?? ""}
            onChange={(e) => onChange("event_name", e.target.value)}
            disabled={!isEdit}
          />
        </FormField>
        <FormFieldGroup title="사진 스타일">
          <ul className="flex list-none gap-3">
            {["A", "B", "C", "D"].map((style) => (
              <li key={style}>
                <label
                  htmlFor={`reservation-photo-style-${style}`}
                  className="flex items-center gap-1"
                >
                  <input
                    id={`reservation-photo-style-${style}`}
                    name="photo_style"
                    type="radio"
                    value={style}
                    checked={reservation.photo_style === style}
                    onChange={() => onChange("photo_style", style)}
                    disabled={!isEdit}
                  />
                  <span>{style}</span>
                </label>
              </li>
            ))}
          </ul>
        </FormFieldGroup>
        <FormFieldGroup title="색상 선택">
          <div className="flex flex-col gap-1">
            {[
              "Soft White",
              "Pastel Pink",
              "Elegant Gold",
              "Natural Wood",
              "Emerald",
            ].map((color) => (
              <label
                key={color}
                htmlFor={`reservation-color-presets-${color}`}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id={`reservation-color-presets-${color}`}
                  name="color_presets"
                  value={color}
                  checked={reservation.color_presets?.includes(color)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const value = e.target.value;

                    const updatedColors = checked
                      ? [...(reservation.color_presets || []), value]
                      : (reservation.color_presets || []).filter(
                          (c) => c !== value,
                        );

                    onChange("color_presets", updatedColors);
                  }}
                  disabled={!isEdit}
                />
                {color}
              </label>
            ))}
          </div>
        </FormFieldGroup>
        <FormField label="커스텀 색상" htmlFor="reservation-custom-color">
          <Textarea
            id="reservation-custom-color"
            name="custom_color"
            value={reservation.custom_color ?? ""}
            onChange={(e) => onChange("custom_color", e.target.value)}
            disabled={!isEdit}
          />
        </FormField>
        <FormField label="디자인 요청" htmlFor="reservation-design-requests">
          <Textarea
            id="reservation-design-requests"
            name="design_requests"
            value={reservation.design_requests ?? ""}
            onChange={(e) => onChange("design_requests", e.target.value)}
            disabled={!isEdit}
          />
        </FormField>
        <FormField label="입금자명" htmlFor="reservation-deposit-name">
          <Input
            id="reservation-deposit-name"
            name="deposit_name"
            value={reservation.deposit_name ?? ""}
            onChange={(e) => onChange("deposit_name", e.target.value)}
            disabled={!isEdit}
          />
        </FormField>
        <FormField label="할인코드" htmlFor="reservation-discount-code">
          <Input
            id="reservation-discount-code"
            name="discount_code"
            value={reservation.discount_code ?? ""}
            disabled={!isEdit}
          />
        </FormField>
        <FormField
          label="적용된 할인금액"
          htmlFor="reservation-applied-discount"
        >
          <Input
            id="reservation-applied-discount"
            name="applied_discount"
            value={reservation.applied_discount ?? ""}
            disabled={!isEdit}
          />
        </FormField>
        <FormField label="예약금" htmlFor="reservation-deposit-amount">
          <Input
            id="reservation-deposit-amount"
            name="deposit_amount"
            value={reservation.deposit_amount ?? ""}
            disabled={!isEdit}
          />
        </FormField>
        <FormField label="총금액" htmlFor="reservation-total-amount">
          <Input
            id="reservation-total-amount"
            name="total_amount"
            value={reservation.total_amount ?? ""}
            disabled={!isEdit}
          />
        </FormField>
      </div>

      <div className="flex flex-col gap-1">
        {reservation?.created_at && (
          <div className="mt-4 text-sm text-gray-500">
            <span className="font-semibold">생성일:</span>{" "}
            {new Date(reservation.created_at).toLocaleString()}
          </div>
        )}
        {reservation?.modified_at && reservation?.modified_by && (
          <div className="text-sm text-gray-500">
            <span className="font-semibold">최근 수정일: </span>
            {new Date(reservation.modified_at).toLocaleString()}{" "}
            <span className="font-semibold">by</span> {reservation.modified_by}
          </div>
        )}
      </div>
    </div>
  );
}
