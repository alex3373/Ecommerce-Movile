// src/pages/auth/Register/Register.tsx
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonToast,
  IonHeader,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { useState } from "react";
import styles from "./Register.module.css";
import Header from "../../../components/common/Header/Header";
import { registerUser } from "../../../services/auth.service";
import { useHistory } from "react-router-dom";
import { registrarEventoAuditoria } from "../../../utils/auditoria";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    if (!nombre || !apellido || !telefono || !direccion || !fechaNacimiento || !email || !password) {
      return showError("Por favor completa todos los campos");
    }

    if (!validateEmail(email)) return showError("Correo inválido");
    if (password.length < 6) return showError("Contraseña muy corta");
    if (!/^\d{9}$/.test(telefono)) return showError("Celular inválido");
    if (nombre.length < 2 || apellido.length < 2) return showError("Nombre o apellido muy cortos");

    try {
      await registerUser(email, password, {
        name: nombre,
        lastName: apellido,
        phone: telefono,
        address: direccion,
        birthDate: fechaNacimiento,
        role: "cliente",
      });

      // guardar evento de registro
      await registrarEventoAuditoria("Registro", email);

      setToastMessage("¡Cuenta creada exitosamente!");
      setShowToast(true);
      history.push("/login");
    } catch (err: any) {
      console.error(err);
      showError("Error al registrar. ¿Ya existe este correo?");
    }
  };

  const showError = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  return (
    <IonPage>
              <Header title="Registro" />

        <IonContent className="ion-padding">
          <div className={styles.container}>
            <img
              src="./assets/logo_ecommerce.png"
              alt="Logo"
              className={styles.logo}
            />
            <h2 className={styles.title}>Crear una cuenta</h2>

            {[
              ["Nombre", nombre, setNombre],
              ["Apellidos", apellido, setApellido],
              ["Celular", telefono, setTelefono],
              ["Dirección", direccion, setDireccion],
              ["Fecha de nacimiento", fechaNacimiento, setFechaNacimiento],
              ["Correo electrónico", email, setEmail],
              ["Contraseña", password, setPassword],
            ].map(([label, value, setter], i) => (
              <IonItem className={styles["input-box"]} key={i}>
                <IonInput
                  type={
                    label === "Contraseña"
                      ? "password"
                      : label === "Fecha de nacimiento"
                        ? "date"
                        : label === "Correo electrónico"
                          ? "email"
                          : "text"
                  }
                  placeholder={label as string}
                  value={value as string}
                  onIonChange={(e) => (setter as any)(e.detail.value!)}
                />
              </IonItem>
            ))}

            <IonButton
              expand="block"
              className={styles["register-button"]}
              onClick={handleRegister}
            >
              Registrarse
            </IonButton>

            <div className={styles["login-link-container"]}>
              <p className={styles["login-text"]}>
                ¿Ya tienes una cuenta?{" "}
                <a href="/login" className={styles["login-link"]}>
                  Inicia sesión aquí
                </a>
              </p>
            </div>
          </div>

          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={3000}
          />
        </IonContent>
    </IonPage>
  );
};

export default Register;
