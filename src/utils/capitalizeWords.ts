// Primeiras letras de cada palavra em maiúscula:
function capitalizeWords(name: string): string {
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

export default capitalizeWords;