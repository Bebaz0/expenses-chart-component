
document.querySelectorAll('.bar').forEach(bar => {
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
  document.querySelectorAll('.bar').forEach(bar => {



    //animation and height
    const value = bar.getAttribute('data-value');
    setTimeout(() => {
      bar.style.height = value + "%";
      bar.classList.add('animated');
    }, 100);
  });
});