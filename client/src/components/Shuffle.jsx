function ShuffleCards(array) {
    let length=array.length;
    for (let i=length; i>0; i--) {
        let randomIndex = Math.floor(Math.random() * i);
        let currentIndex = i - 1;
        let temp=array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex]=temp;
    }
    return array
}

export default ShuffleCards