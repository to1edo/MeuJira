export default function formatTime(desiredDate:number) {
  const currentDate = Date.now();
  const timeDifference = currentDate - desiredDate;
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `Há ${minutes} minutos`;
  } else if (hours < 24) {
    return `Há  ${hours} horas`;
  } else {
    return `Há ${days} dias`;
  }
}
