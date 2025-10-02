import {
    IonPage,
    IonContent,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonLabel,
    IonTextarea,
    IonInput,
    IonButton,
    IonList,
    IonText,
    IonFab,
    IonFabButton,
    IonIcon,
} from "@ionic/react";
import { chatbubbleEllipsesOutline } from "ionicons/icons";
import { useState } from "react";
import Header from "../../components/Header/Header";

// Firestore
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../../services/firebase";

const faqs = [
    {
        question: "¿Cómo crear una cuenta?",
        answer: "Para crear una cuenta, presiona el botón 'Registrarse' y completa el formulario.",
    },
    {
        question: "¿Cómo restablecer mi contraseña?",
        answer: "Haz clic en 'Olvidé mi contraseña' en la pantalla de login y sigue las instrucciones.",
    },
    {
        question: "¿Dónde veo mis pedidos?",
        answer: "En tu perfil encontrarás la sección 'Mis pedidos'.",
    },
];

const tutorials = [
    {
        title: "Primeros pasos en la app",
        url: "https://youtu.be",
    },
    {
        title: "Cómo hacer un pedido",
        url: "https://youtu.be",
    },
];

const SupportPage: React.FC = () => {
    const [contact, setContact] = useState({ name: "", email: "", message: "" });

    // ✅ Manejo de cambios usando e.detail.value directamente
    const handleChange = (field: string) => (e: CustomEvent) => {
        const value = e.detail.value;
        setContact((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const user = auth.currentUser;

        if (!user) {
            alert("Debes estar autenticado para enviar un mensaje.");
            return;
        }

        try {
            await addDoc(collection(db, "messages"), {
                name: contact.name,
                email: contact.email,
                message: contact.message,
                userId: user.uid,
                createdAt: Timestamp.now(),
            });

            alert(`Gracias ${contact.name}, tu mensaje ha sido enviado.`);
            setContact({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Error al guardar el mensaje:", error);
            alert("Hubo un error al enviar el mensaje. Intenta nuevamente.");
        }
    };

    const openLink = (url: string) => {
        window.open(url, "_blank");
    };

    return (
        <IonPage>
            <Header title="Soporte" />
            <IonContent fullscreen className="ion-padding">
                <IonText>
                    <h2>Preguntas Frecuentes</h2>
                </IonText>

                <IonAccordionGroup>
                    {faqs.map((faq, i) => (
                        <IonAccordion value={`faq-${i}`} key={i}>
                            <IonItem slot="header" color="light">
                                <IonLabel>{faq.question}</IonLabel>
                            </IonItem>
                            <div className="ion-padding" slot="content">{faq.answer}</div>
                        </IonAccordion>
                    ))}
                </IonAccordionGroup>

                <IonText>
                    <h2 style={{ marginTop: "2rem" }}>Tutoriales</h2>
                </IonText>

                <IonList>
                    {tutorials.map((tut, i) => (
                        <IonItem button key={i} onClick={() => openLink(tut.url)}>
                            <IonLabel>{tut.title}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>

                <IonText>
                    <h2 style={{ marginTop: "2rem" }}>Contáctanos</h2>
                </IonText>

                <form onSubmit={handleSubmit}>
                    <IonInput
                        placeholder="Tu nombre"
                        value={contact.name}
                        onIonInput={handleChange("name")}
                        required
                        className="ion-margin-bottom"
                    />
                    <IonInput
                        type="email"
                        placeholder="Tu correo electrónico"
                        value={contact.email}
                        onIonInput={handleChange("email")}
                        required
                        className="ion-margin-bottom"
                    />
                    <IonTextarea
                        placeholder="Escribe tu mensaje"
                        value={contact.message}
                        onIonInput={handleChange("message")}
                        required
                        rows={6}
                        className="ion-margin-bottom"
                    />
                    <IonButton type="submit" expand="block" color="primary">
                        Enviar Mensaje
                    </IonButton>
                </form>

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton
                        color="secondary"
                        onClick={() => alert("Aquí puedes abrir tu chat en vivo")}
                    >
                        <IonIcon icon={chatbubbleEllipsesOutline} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default SupportPage;