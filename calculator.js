/**
 * Calculus Research — Loan Calculator
 * Interactive amortization calculator for the lending page
 */
(function () {
  var calcSection = document.getElementById('cr-loan-calculator');
  if (!calcSection) return;

  var BRAND = { green: '#0F4D2C', greenLight: '#3E9B5F', gold: '#F2A41F', charcoal: '#1C1F22' };

  // Inject calculator styles
  var css = [
    '#cr-calc-wrap{font-family:"Inter",system-ui,sans-serif}',
    '.cr-calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px}',
    '@media(max-width:768px){.cr-calc-grid{grid-template-columns:1fr}}',
    '.cr-calc-label{display:block;font-size:13px;font-weight:600;color:#555;margin-bottom:6px}',
    'html.dark .cr-calc-label{color:#9aa3a8}',
    '.cr-calc-input{width:100%;padding:12px 16px;border:1px solid #DDE6E1;border-radius:10px;font-size:15px;font-family:"Inter",sans-serif;outline:none;transition:border-color .2s}',
    '.cr-calc-input:focus{border-color:' + BRAND.greenLight + '}',
    'html.dark .cr-calc-input{background:#1e2329;color:#e0e0e0;border-color:rgba(255,255,255,.12)}',
    '.cr-calc-slider{width:100%;margin-top:6px;-webkit-appearance:none;appearance:none;height:6px;border-radius:3px;background:#DDE6E1;outline:none;cursor:pointer}',
    '.cr-calc-slider::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:' + BRAND.green + ';cursor:pointer;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.2)}',
    '.cr-calc-slider::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:' + BRAND.green + ';cursor:pointer;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.2)}',
    '.cr-calc-result{text-align:center;padding:28px;background:' + BRAND.green + ';border-radius:14px;color:#fff}',
    '.cr-calc-result h4{font-family:"Space Grotesk",sans-serif;font-size:14px;font-weight:600;opacity:.75;margin:0 0 4px;text-transform:uppercase;letter-spacing:.05em}',
    '.cr-calc-result .big{font-family:"Space Grotesk",sans-serif;font-size:36px;font-weight:700;margin:0 0 20px}',
    '.cr-calc-detail{display:flex;justify-content:space-around;margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,.2)}',
    '.cr-calc-detail div{text-align:center}',
    '.cr-calc-detail span{display:block;font-size:11px;opacity:.6;margin-bottom:2px}',
    '.cr-calc-detail strong{font-size:16px}',
    '.cr-calc-select{width:100%;padding:12px 16px;border:1px solid #DDE6E1;border-radius:10px;font-size:15px;font-family:"Inter",sans-serif;outline:none;background:#fff;cursor:pointer;transition:border-color .2s}',
    'html.dark .cr-calc-select{background:#1e2329;color:#e0e0e0;border-color:rgba(255,255,255,.12)}',
    '.cr-amort-table{width:100%;border-collapse:collapse;font-size:13px;margin-top:16px}',
    '.cr-amort-table th{text-align:left;padding:8px 12px;background:' + BRAND.green + ';color:#fff;font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.03em}',
    '.cr-amort-table th:first-child{border-radius:8px 0 0 0}',
    '.cr-amort-table th:last-child{border-radius:0 8px 0 0}',
    '.cr-amort-table td{padding:8px 12px;border-bottom:1px solid #EEF2F0}',
    'html.dark .cr-amort-table td{border-color:rgba(255,255,255,.06)}',
    '.cr-amort-table tr:hover td{background:rgba(15,77,44,.04)}',
    '.cr-amort-toggle{background:none;border:1px solid ' + BRAND.green + ';color:' + BRAND.green + ';border-radius:8px;padding:8px 20px;font-size:13px;font-weight:600;cursor:pointer;font-family:"Inter",sans-serif;transition:all .2s;margin-top:16px}',
    '.cr-amort-toggle:hover{background:' + BRAND.green + ';color:#fff}',
    'html.dark .cr-amort-toggle{color:' + BRAND.greenLight + ';border-color:' + BRAND.greenLight + '}',
    'html.dark .cr-amort-toggle:hover{background:' + BRAND.greenLight + ';color:#fff}'
  ].join('\n');
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // Build calculator HTML
  calcSection.innerHTML = [
    '<div id="cr-calc-wrap">',
    '  <div class="cr-calc-grid">',
    '    <div>',
    '      <label class="cr-calc-label">Loan Amount</label>',
    '      <input type="text" id="cr-calc-amount" class="cr-calc-input" value="$500,000" />',
    '      <input type="range" id="cr-calc-amount-slider" class="cr-calc-slider" min="50000" max="10000000" step="25000" value="500000" />',
    '      <div style="display:flex;justify-content:space-between;font-size:11px;color:#999;margin-top:4px"><span>$50K</span><span>$10M</span></div>',
    '      <div style="margin-top:20px">',
    '        <label class="cr-calc-label">Interest Rate (%)</label>',
    '        <input type="text" id="cr-calc-rate" class="cr-calc-input" value="6.50%" />',
    '        <input type="range" id="cr-calc-rate-slider" class="cr-calc-slider" min="1" max="15" step="0.125" value="6.5" />',
    '        <div style="display:flex;justify-content:space-between;font-size:11px;color:#999;margin-top:4px"><span>1%</span><span>15%</span></div>',
    '      </div>',
    '      <div style="margin-top:20px">',
    '        <label class="cr-calc-label">Loan Term</label>',
    '        <select id="cr-calc-term" class="cr-calc-select">',
    '          <option value="5">5 Years</option>',
    '          <option value="10">10 Years</option>',
    '          <option value="15">15 Years</option>',
    '          <option value="20">20 Years</option>',
    '          <option value="25" selected>25 Years</option>',
    '          <option value="30">30 Years</option>',
    '        </select>',
    '      </div>',
    '    </div>',
    '    <div>',
    '      <div class="cr-calc-result">',
    '        <h4>Estimated Monthly Payment</h4>',
    '        <div class="big" id="cr-calc-monthly">$0</div>',
    '        <div class="cr-calc-detail">',
    '          <div><span>Total Interest</span><strong id="cr-calc-interest">$0</strong></div>',
    '          <div><span>Total Cost</span><strong id="cr-calc-total">$0</strong></div>',
    '        </div>',
    '      </div>',
    '      <div style="text-align:center">',
    '        <button class="cr-amort-toggle" id="cr-amort-btn">Show Amortization Schedule</button>',
    '      </div>',
    '      <div id="cr-amort-wrap" style="display:none;max-height:300px;overflow-y:auto;margin-top:12px"></div>',
    '    </div>',
    '  </div>',
    '  <p style="font-size:11px;color:#999;margin-top:20px;text-align:center">',
    '    * This calculator is for informational purposes only. Actual rates and terms may vary. Contact us for a personalized quote.',
    '  </p>',
    '</div>'
  ].join('');

  // Elements
  var amountInput = document.getElementById('cr-calc-amount');
  var amountSlider = document.getElementById('cr-calc-amount-slider');
  var rateInput = document.getElementById('cr-calc-rate');
  var rateSlider = document.getElementById('cr-calc-rate-slider');
  var termSelect = document.getElementById('cr-calc-term');
  var monthlyEl = document.getElementById('cr-calc-monthly');
  var interestEl = document.getElementById('cr-calc-interest');
  var totalEl = document.getElementById('cr-calc-total');
  var amortBtn = document.getElementById('cr-amort-btn');
  var amortWrap = document.getElementById('cr-amort-wrap');

  function formatCurrency(n) {
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  function parseAmount(s) {
    return parseFloat(s.replace(/[^0-9.]/g, '')) || 0;
  }

  function parseRate(s) {
    return parseFloat(s.replace(/[^0-9.]/g, '')) || 0;
  }

  function calculate() {
    var P = parseAmount(amountInput.value);
    var annualRate = parseRate(rateInput.value) / 100;
    var years = parseInt(termSelect.value);
    var n = years * 12;
    var r = annualRate / 12;

    var monthly = 0;
    var totalPaid = 0;
    var totalInterest = 0;

    if (r > 0 && P > 0 && n > 0) {
      monthly = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      totalPaid = monthly * n;
      totalInterest = totalPaid - P;
    } else if (r === 0 && P > 0 && n > 0) {
      monthly = P / n;
      totalPaid = P;
      totalInterest = 0;
    }

    monthlyEl.textContent = formatCurrency(monthly);
    interestEl.textContent = formatCurrency(totalInterest);
    totalEl.textContent = formatCurrency(totalPaid);

    // Update amortization if visible
    if (amortWrap.style.display !== 'none') {
      buildAmortTable(P, r, n, monthly);
    }
  }

  function buildAmortTable(P, r, n, monthly) {
    var rows = [];
    var balance = P;
    var years = n / 12;

    rows.push('<table class="cr-amort-table"><thead><tr><th>Year</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead><tbody>');

    for (var year = 1; year <= years; year++) {
      var yearPrincipal = 0;
      var yearInterest = 0;
      for (var m = 0; m < 12; m++) {
        if (balance <= 0) break;
        var intPayment = balance * r;
        var princPayment = Math.min(monthly - intPayment, balance);
        yearPrincipal += princPayment;
        yearInterest += intPayment;
        balance -= princPayment;
      }
      if (balance < 0) balance = 0;
      rows.push('<tr><td>' + year + '</td><td>' + formatCurrency(yearPrincipal) + '</td><td>' + formatCurrency(yearInterest) + '</td><td>' + formatCurrency(balance) + '</td></tr>');
    }

    rows.push('</tbody></table>');
    amortWrap.innerHTML = rows.join('');
  }

  // Sync slider ↔ input
  amountSlider.oninput = function () {
    amountInput.value = formatCurrency(parseFloat(this.value));
    calculate();
  };
  amountInput.addEventListener('change', function () {
    var v = parseAmount(this.value);
    amountSlider.value = v;
    this.value = formatCurrency(v);
    calculate();
  });

  rateSlider.oninput = function () {
    rateInput.value = parseFloat(this.value).toFixed(2) + '%';
    calculate();
  };
  rateInput.addEventListener('change', function () {
    var v = parseRate(this.value);
    rateSlider.value = v;
    this.value = v.toFixed(2) + '%';
    calculate();
  });

  termSelect.addEventListener('change', calculate);

  amortBtn.onclick = function () {
    if (amortWrap.style.display === 'none') {
      amortWrap.style.display = 'block';
      amortBtn.textContent = 'Hide Amortization Schedule';
      var P = parseAmount(amountInput.value);
      var r = parseRate(rateInput.value) / 100 / 12;
      var n = parseInt(termSelect.value) * 12;
      var monthly = parseFloat(monthlyEl.textContent.replace(/[^0-9.]/g, ''));
      buildAmortTable(P, r, n, monthly);
    } else {
      amortWrap.style.display = 'none';
      amortBtn.textContent = 'Show Amortization Schedule';
    }
  };

  // Initial calculation
  calculate();

})();
