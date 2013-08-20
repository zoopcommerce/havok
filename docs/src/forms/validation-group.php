
        <section id="validation-group" title="Validation Group">
          <div class="page-header">
            <h1>Validation Group</h1>
          </div>

            <p><code>havok/form/ValidationGroup</code> provides the ability to do validation across multiple fields in a form. Place a ValidationGroup inside a form, and set a validator. Also set an array of field names in that form which will be passed to the validator. ValidationGroup will display any validation messages. Eg:</p>

          <h2>Example</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havok/docs/module/Formspy" class="form-horizontal">
                 <form data-dojo-type="havok/form/form">
                    <input
                        data-dojo-type="havok/form/TextBox"
                        value="Not Toby"
                        data-dojo-props="label: 'username1', name: 'username1'"
                    />
                    <input
                        data-dojo-type="havok/form/TextBox"
                        value="Toby"
                        data-dojo-props="label: 'username2', name: 'username2'"
                    />
                    <span
                        data-dojo-type="havok/form/ValidationGroup"
                        data-dojo-props="
                        fields: ['username1', 'username2'],
                        validator: 'havok/docs/module/MultiFieldValidator'"
                    ></span>
                 </form>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;form data-dojo-type=&quot;havok/form/form&quot;&gt;
   &lt;input
       data-dojo-type=&quot;havok/form/TextBox&quot;
       value=&quot;Not Toby&quot;
       data-dojo-props=&quot;label: 'username1', name: 'username1'&quot;
   /&gt;
   &lt;input
       data-dojo-type=&quot;havok/form/TextBox&quot;
       value=&quot;Toby&quot;
       data-dojo-props=&quot;label: 'username2', name: 'username2'&quot;
   /&gt;
   &lt;span
       data-dojo-type=&quot;havok/form/ValidationGroup&quot;
       data-dojo-props=&quot;
       fields: ['username1', 'username2'],
       validator: 'havok/docs/module/MultiFieldValidator'&quot;
   &gt;&lt;/span&gt;
&lt;/form&gt;
</pre>

        </section>
