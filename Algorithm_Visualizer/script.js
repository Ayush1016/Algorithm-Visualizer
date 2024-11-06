let array = [];

function generateArray() {
    array = [];
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';

    for (let i = 0; i < 50; i++) {
        const height = Math.floor(Math.random() * 400) + 20;
        array.push(height);

        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${height}px`;
        bar.style.width = '10px';
        arrayContainer.appendChild(bar);
    }
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            // Highlight the current element being compared
            bars[j].style.backgroundColor = 'red';

            // Pause for animation
            await sleep(150); // Slower speed for better visibility

            if (array[j] > array[j + 1]) {
                // Swap heights in the array
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Update bars
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            // Revert color back after comparison
            bars[j].style.backgroundColor = '#007bff';
        }
    }
}

async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;
    const bars = document.getElementsByClassName('bar');

    for (let j = low; j < high; j++) {
        // Highlight the current element being compared and the pivot
        bars[j].style.backgroundColor = 'red';
        bars[high].style.backgroundColor = 'green'; // Pivot element in green

        // Pause for animation
        await sleep(150); // Slower speed for better visibility

        if (array[j] < pivot) {
            i++;
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            // Update bars
            bars[i].style.height = `${array[i]}px`;
            bars[j].style.height = `${array[j]}px`;

            // Highlight swapped element
            bars[i].style.backgroundColor = 'yellow';
            bars[j].style.backgroundColor = 'yellow';

            await sleep(150); // Slower speed for better visibility
        }

        // Revert color back after comparison
        bars[j].style.backgroundColor = '#007bff';
    }

    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;

    // Update bars
    bars[i + 1].style.height = `${array[i + 1]}px`;
    bars[high].style.height = `${array[high]}px`;

    // Revert pivot color and highlight swap
    bars[i + 1].style.backgroundColor = 'yellow';
    bars[high].style.backgroundColor = 'yellow';

    await sleep(150); // Slower speed for better visibility

    // Revert colors back
    bars[i + 1].style.backgroundColor = '#007bff';
    bars[high].style.backgroundColor = '#007bff';

    return i + 1;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

generateArray();
