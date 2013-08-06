
        <section id="validators" title="Validators">
          <div class="page-header">
            <h1>Validators</h1>
          </div>

          <p>Validators will check if data meets certain criteria and return a message if it does not.</p>

          <p>Havok uses the <a href="http://zoopcommerce.github.io/mystique">mystique</a> validator library. Which includes:</p>

          <ul>
              <li>Alpha</li>
              <li>Boolean</li>
              <li>Chain</li>
              <li>CreditCard</li>
              <li>CreditCardExpiry</li>
              <li>Cvv</li>
              <li>Date</li>
              <li>Equal</li>
              <li>Alpha</li>
              <li>Float</li>
              <li>GreaterThan</li>
              <li>LessThan</li>
              <li>HexColor</li>
              <li>Int</li>
              <li>Length</li>
              <li>LessThan</li>
              <li>LethThanEqual</li>
              <li>NotEqual</li>
              <li>NotRequired</li>
              <li>Password</li>
              <li>Regex</li>
              <li>Slug</li>
              <li>String</li>
              <li>And probably more ...</li>
          </ul>

          <h2>Mystique Validators</h2>

          <p>Use the mystique validators as described in the mystique docs. Eg</p>

<pre class="prettyprint linenums">
require(['mystique/Length'], function(Length){
    var validator = new Length({min: 10, max: 20}),
        result = validator.isValid(myValue);
})
</pre>

          <p>Mystique validators can be extended and chained. See the mystique docs for more detail.</p>

          <h2>Validator Factory</h2>

          <p>The validator factory can be used to create instances of validators. eg:</p>


<pre class="prettyprint linenums">
require(['havok/get!ValidatorFactory'],
   function(factory){
       factory.create(['Alpha', {base: 'Length', params: {min: 5, max: 10}}]).then(function(validator){
           result = validator.isValid(value);
       })
   }
)
</pre>

          <p>The validator factory uses <code>havok/di</code> to create and configure the validators. It accepts any valid di config.</p>
        </section>
