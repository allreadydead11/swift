import Input from "..";
import PhoneInputWrapper from "./PhoneInputWrapper";
import icons from "../../../constants/icons";

import type { TInputProps } from "../types";
import { ForwardedRef, forwardRef } from "react";

const PhoneInput = forwardRef((props: TInputProps, ref: ForwardedRef<unknown>) => {
  return (
    <PhoneInputWrapper>
      <div className="country" data-testid="country-code">
        <div>{icons.nigeriaFlagIcon()}</div>
        <span className="country__prefix">+234</span>
      </div>

      <Input {...props} ref={ref} />
    </PhoneInputWrapper>
  );
});

export default PhoneInput;