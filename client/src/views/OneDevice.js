import { DataPlansForm } from "../components/data-plans-form/data-plans-form.component";
import { DeviceInfo } from "../components/device-info/device-info.component";


// This is the second page, which shows device details and form for choosing plan. 
export const OneDevice = () => {

  return (
    <div>
      <DeviceInfo></DeviceInfo>
      <div className="w-50 p-4 rounded mx-auto shadow">
        <DataPlansForm></DataPlansForm>
      </div>
    </div>
  );
};

export default OneDevice;
