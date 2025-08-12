export default function RoomDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Room {params.id}</h1>
      <p>Room details and watch party interface</p>
    </div>
  );
}
