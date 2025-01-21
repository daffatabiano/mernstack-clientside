export default function CircularOverlay() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '200px', // Desired size of the circular crop
        height: '200px',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        border: '2px solid #fff', // Optional: for better visibility
        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)', // Dim surrounding area
        pointerEvents: 'none', // Allow cropper interactions
      }}
    />
  );
}
