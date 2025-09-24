import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import '../../../App.css';

const Slider = () => {
  const images = [
    { id: 1, src: '/assets/banner1.jpg', alt: 'Image 1' },
    { id: 2, src: '/assets/banner2.jpg', alt: 'Image 2' },
    { id: 3, src: '/assets/banner3.jpg', alt: 'Image 3' },
  ];

  return (
    <section style={{ margin: 0, padding: 0, position: 'relative', width: '100%', color: '#000' }}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
        <img
  src={image.src}
  alt={image.alt}
  style={{
    width: '100%',
    height: 'auto',  // Elimina la restricción de altura fija
    objectFit: 'contain',
    backgroundColor: '#fff'
  }}
/>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Form */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            textTransform: 'capitalize',
            letterSpacing: '0.05em',
            gap: '1.25rem',
          }}
        >

        </div>
      </div>
    </section>
  );
};

export default Slider;

