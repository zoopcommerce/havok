
        <section id="validation-group" title="Validation Group">
          <div class="page-header">
            <h1>Validation Group</h1>
          </div>

            <p><code>havok/form/ValidationGroup</code> provides the ability to do validation across multiple inputs. Wrap some inputs inside the ValidationGroup, and set a validator on the group. The validator will be passed the value object of the group to validate. Eg</p>

          <h2>Example</h2>
          <div class="bs-docs-example">
             <div data-dojo-type="havokdocs/Formspy" class="form-horizontal">
                <div
                    data-dojo-type="havok/form/ValidationGroup"
                    data-dojo-props="validator: 'havokdocs/MultiFieldValidator'"
                >
                    <input
                        id="username1"
                        data-dojo-type="havok/form/TextBox"
                        value="Not Toby"
                        data-dojo-props="label: 'username1', name: 'username1'"
                    />
                    <input
                        id="username2"
                        data-dojo-type="havok/form/TextBox"
                        value="Toby"
                        data-dojo-props="label: 'username2', name: 'username2'"
                    />
                </div>
             </div>
          </div>

<pre class="prettyprint linenums">
&lt;div
    data-dojo-type=&quot;havok/form/ValidationGroup&quot;
    data-dojo-props=&quot;validator: 'havokdocs/MultiFieldValidator'&quot;
&gt;
    &lt;input
        id=&quot;username1&quot;
        data-dojo-type=&quot;havok/form/TextBox&quot;
        value=&quot;Not Toby&quot;
        data-dojo-props=&quot;label: 'username1', name: 'username1'&quot;
    /&gt;
    &lt;input
        id=&quot;username2&quot;
        data-dojo-type=&quot;havok/form/TextBox&quot;
        value=&quot;Toby&quot;
        data-dojo-props=&quot;label: 'username2', name: 'username2'&quot;
    /&gt;
&lt;/div&gt;
</pre>

        </section>
