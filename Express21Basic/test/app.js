
function fizzBuzz(n) {
    // Write your code here
    for (let i = 1; i <= n; i++) {
        if (i % 3 == 0 && i % 5 == 0) {
            console.log('FizzBuzz');
        } else if(i%3==0){
            console.log('fizz')
        } else if (i % 5 == 0) {
            console.log('buzz')
        } else{
            console.log(i)
        }
    }

}
// fizzBuzz(15);

const arr = [9,8,7, 6, 5, 4, 2, 3, 1]

// const sortedArr = arr.sort()
// console.log(sortedArr);

// console.log(arr)

// console.log(arr.at(-1))

// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i], 'in i loop')
//     for (let j = 0; j < arr.length; j++) {
//         console.log(arr[j], 'in j loop')
//         if(arr[i]<arr[j]){
//             let temp = arr[i];
//             arr[i] = arr[j];
//             arr[j] = temp;
//         }
        
//     }

// }
// console.log(arr)

// for (let i = 0; i < arr.length; i++) {
//     if(arr[i]>arr[i+1]){
//         let temp = arr[i+1]
//         arr[i+1]=arr[i]
//         arr[i] = temp
//     }
    
// }
// console.log(arr)