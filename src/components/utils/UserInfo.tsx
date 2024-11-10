import { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Avatar } from "primereact/avatar";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";

const UserInfo: React.FC = () => {
  const [storedId, setStoredId] = useState<string>("");
  const [storedName, setStoredName] = useState<string>("");
  const [inputId, setInputId] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const op = useRef<OverlayPanel>(null);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = (): void => {
    const id = localStorage.getItem("userId");
    const name = localStorage.getItem("userName");
    setStoredId(id || "");
    setStoredName(name || "");
    setInputId(id || "");
    setInputName(name || "");
  };

  const handleSave = (): void => {
    if (inputId && inputName) {
      localStorage.setItem("userId", inputId);
      localStorage.setItem("userName", inputName);
      setStoredId(inputId);
      setStoredName(inputName);
      op.current?.hide();

      toast.current?.show({
        severity: "success",
        summary: "保存成功",
        detail: "ユーザー情報が保存されました",
        life: 3000,
      });
    } else {
      toast.current?.show({
        severity: "error",
        summary: "入力エラー",
        detail: "IDと名前を両方入力してください",
        life: 3000,
      });
    }
  };

  const handleUserInfoClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    loadUserInfo();
    op.current?.toggle(e);
  };
  return (
    <div>
      <Toast ref={toast} />
      <div className="flex align-items-center" onClick={handleUserInfoClick}>
        {storedName ? (
          <>
            <span className="mr-2">
              Welcome {storedName} ({storedId}) !
            </span>
            <Avatar icon="pi pi-user" shape="circle" />
          </>
        ) : (
          <span className="mr-2">UserName is not Set</span>
        )}
      </div>

      <OverlayPanel ref={op}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="id">ID</label>
            <InputMask
              id="id"
              value={inputId}
              onChange={(e: InputMaskChangeEvent) =>
                setInputId(e.value as string)
              }
              mask="aaa99999"
              placeholder="pit00000"
            />
          </div>
          <div className="p-field">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              value={inputName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputName(e.target.value)
              }
              placeholder="南山太郎"
            />
          </div>
          <Button label="OK" icon="pi pi-check" onClick={handleSave} />
        </div>
      </OverlayPanel>
    </div>
  );
};

export default UserInfo;
