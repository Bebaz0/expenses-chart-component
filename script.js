
document.querySelectorAll('.bar').forEach(bar => {

  fetch('data.json')
      .then(response => response.json())
        .then(data => {
            // Loop through the data and set the bar values
            data.forEach(item => {
                const day = item.day;
                const value = item.amount;
                const barElement = document.querySelector(`.bar[data-day="${day}"]`);
                if (barElement) {
                barElement.setAttribute('data-value', value);
                }
            });
        })

  bar.addEventListener('mouseenter', function () {
    const value = this.getAttribute('data-value');
    const tooltip = document.createElement('div');
    tooltip.className = 'bar-tooltip';
    tooltip.textContent = `$${value}`;
    tooltip.style.position = 'absolute';
    tooltip.style.background = '#382314';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '8px 8px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '13px';
    tooltip.style.top = (this.getBoundingClientRect().top - 40 + window.scrollY) + 'px';
    tooltip.style.left = (this.getBoundingClientRect().left + this.offsetWidth / 2 - 30 + window.scrollX) + 'px';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = 1000;
    tooltip.id = 'bar-tooltip';
    tooltip.fontweight = 'bold';
    document.body.appendChild(tooltip);
  });

  bar.addEventListener('mouseleave', function () {
    const tooltip = document.getElementById('bar-tooltip');
    if (tooltip) tooltip.remove();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  //Dictionary with the days o the week
    const days = {
        0: 'sun',
        1: 'mon',
        2: 'tue',
        3: 'wed',
        4: 'thu',
        5: 'fri',
        6: 'sat'
    };
  let dayofweek = new Date().getDay();
  document.querySelectorAll('.bar').forEach(bar => {
    //checking if the bar is today and changing the color
    if (bar.getAttribute('data-day') === days[dayofweek]) {
      bar.style.backgroundColor = '#76B5BC';
      bar.addEventListener('mouseenter', function () {
        bar.style.backgroundColor = '#B4DFE5';
      })
        bar.addEventListener('mouseleave', function () {
            bar.style.backgroundColor = '#76B5BC';
        })
    }

    //animation and height
    const value = bar.getAttribute('data-value');
    setTimeout(() => {
      bar.style.height = value + "%";
      bar.classList.add('animated');
    }, 100);
  });
  //changing month expenses
    const monthExpenses = calculateMonthExpenses();
    document.getElementById('total').textContent = monthExpenses;
});

//Function to handle the calculation of month expenses
function calculateMonthExpenses() {
  const bars = document.querySelectorAll('.bar');
  let total = 0;
  bars.forEach(bar => {
    const value = parseFloat(bar.getAttribute('data-value'));
    total += value;
  });
  return total;
}