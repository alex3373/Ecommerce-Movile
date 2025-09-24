import { IonCard, IonImg } from "@ionic/react";
import "./ProductImage.css";

interface Props {
  src: string;
  alt: string;
}

const ProductImage: React.FC<Props> = ({ src, alt }) => (
  <IonCard className="product-detail-img-card">
    <IonImg src={src} alt={alt} className="product-detail-img" />
  </IonCard>
);

export default ProductImage;
