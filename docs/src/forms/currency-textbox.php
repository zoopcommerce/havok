
        <section id="currency-textbox" title="Currency Textbox">
          <div class="page-header">
            <h1>Currency Textbox</h1>
          </div>

            <p><code>havok/form/CurrencyTextbox</code> extends <code>havok/form/NumberTextbox</code> and <code>havok/form/_ValidationMixin</code> to add localized currency formatting ability.</p>

          <h2>Example</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/CurrencyTextBox"
                    data-dojo-props="label:'Cost'"
                />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/CurrencyTextBox&quot;
    data-dojo-props=&quot;label:'Cost'&quot;
/&gt;
</pre>

            <h3>Currency Box with preset float value</h3>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/CurrencyTextBox"
                    data-dojo-props="
                        label:'Cost',
                        value: 2.2
                    "
                />
             </div>
          </div>

            <h3>Currency Box with preset string value</h3>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/CurrencyTextBox"
                    data-dojo-props="
                        label:'Cost',
                        value: '2.2'
                    "
                />
             </div>
          </div>

        </section>
