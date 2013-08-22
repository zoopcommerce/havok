        <section id="color" title="Color">
          <div class="page-header">
            <h1>Color</h1>
          </div>

            <h2>Hex Color</h2>
            
            <p><code>havok/form/HexColor</code> extends <code>havok/form/ValidationTextbox</code>. It can be used to enter valid six character hex codes.</p>

          <h2>Example</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                <input data-dojo-type="havok/form/HexColor"
                       value = "abc123"
                />
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/HexColor&quot;
       value = &quot;abc123&quot;
/&gt;
</pre>

         <h2>Color Picker</h2>

         <p>The <code>havok/form/ColorPicker</code> input.</p>

          <h2>Example</h2>

          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
              <input data-dojo-type="havok/form/ColorPicker"
                  data-dojo-props="
                     label: 'Color',
                     value: '#AA0033',
                     helpMessages: 'please pick a color'
                  "
              />
             </div>
          </div>
<pre class="prettyprint linenums">
&lt;input data-dojo-type=&quot;havok/form/ColorPicker&quot;
    data-dojo-props=&quot;
       label: 'Color',
       value: '#AA0033',
       helpMessages: 'please pick a color'
    &quot;
/&gt;
</pre>

        </section>
