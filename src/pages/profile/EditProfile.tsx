import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonAvatar,
  IonIcon,
  IonTextarea,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  camera,
  personOutline,
  mailOutline,
  callOutline,
  informationCircleOutline,
  calendarOutline,
  locationOutline,
} from "ionicons/icons";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { auth, db } from "../../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import './EditProfile.css';


const EditProfile = () => {
  const history = useHistory();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [celular, setCelular] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setNombre(data.name || "");
          setApellido(data.lastName || "");
          setCelular(data.phone || "");
          setDireccion(data.address || "");
          setFechaNacimiento(data.birthDate || "");
          setBio(data.bio || "");
          setEmail(data.email || "");
          setFoto(data.photoURL || "");
        }
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newPhotoURL = foto;
    if (profileImage) {
      const options = { maxSizeMB: 0.1, maxWidthOrHeight: 256, useWebWorker: true };
      const compressedFile = await imageCompression(profileImage, options);
      const storage = getStorage();
      const storageRef = ref(storage, `profile_photos/${auth.currentUser?.uid}_${Date.now()}.jpg`);
      await uploadBytes(storageRef, compressedFile);
      newPhotoURL = await getDownloadURL(storageRef);
    }
    await updateDoc(doc(db, "users", auth.currentUser!.uid), {
      name: nombre,
      lastName: apellido,
      phone: celular,
      address: direccion,
      birthDate: fechaNacimiento,
      bio: bio,
      photoURL: newPhotoURL,
    });
    history.push("/profile");
  };

  return (
    <IonPage>
      <Header title="Editar Perfil" />
      <IonContent fullscreen className="edit-profile-content">
        <form onSubmit={handleSubmit}>
          {/* --- Sección del Avatar --- */}
          <div className="avatar-section ion-text-center">
            <IonAvatar className="profile-avatar-edit">
              <img src={profileImage ? URL.createObjectURL(profileImage) : foto || "/assets/avatar-default.png"} alt="Avatar" />
            </IonAvatar>
            <IonButton fill="clear" className="change-photo-btn">
              <IonIcon slot="start" icon={camera} />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setProfileImage(e.target.files[0]);
                  }
                }}
              />
              Cambiar foto
            </IonButton>
          </div>

          {/* --- Formulario de Edición --- */}
          <div className="form-fields">
            <IonItem lines="none" className="form-input-item">
              <IonIcon icon={personOutline} slot="start" color="medium" />
              <IonLabel position="stacked">Nombre</IonLabel>
              <IonInput
                type="text"
                value={nombre}
                onIonChange={e => setNombre(e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem lines="none" className="form-input-item">
              <IonLabel position="stacked">Apellido</IonLabel>
              <IonInput
                type="text"
                value={apellido}
                onIonChange={e => setApellido(e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem lines="none" className="form-input-item">
              <IonIcon icon={mailOutline} slot="start" color="medium" />
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                readonly
                disabled
              />
            </IonItem>

            <IonItem lines="none" className="form-input-item">
              <IonIcon icon={callOutline} slot="start" color="medium" />
              <IonLabel position="stacked">Celular</IonLabel>
              <IonInput
                type="tel"
                value={celular}
                onIonChange={e => setCelular(e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem lines="none" className="form-input-item">
              <IonIcon icon={locationOutline} slot="start" color="medium" />
              <IonLabel position="stacked">Dirección</IonLabel>
              <IonInput
                type="text"
                value={direccion}
                onIonChange={e => setDireccion(e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem lines="none" className="form-input-item">
              <IonIcon icon={calendarOutline} slot="start" color="medium" />
              <IonLabel position="stacked">Fecha de nacimiento</IonLabel>
              <IonInput
                type="date"
                value={fechaNacimiento}
                onIonChange={e => setFechaNacimiento(e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem lines="none" className="form-input-item">
              <IonIcon icon={informationCircleOutline} slot="start" color="medium" />
              <IonLabel position="stacked">Biografía</IonLabel>
              <IonTextarea rows={3} name="bio" value={bio} onIonChange={e => setBio(e.detail.value!)} />
            </IonItem>
          </div>

          <div className="form-actions">
            <IonButton
              expand="block"
              type="submit"
              className="save-profile-btn"
            >
              Guardar Cambios
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;