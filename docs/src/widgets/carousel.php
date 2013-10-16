
        <section id="carousel" title="Carousel">
          <div class="page-header">
            <h1>Carousel</h1>
          </div>

          <p>Simply use <code>havok/widget/Carousel</code>. Eg:</p>

          <div class="bs-docs-example">
            <ol data-dojo-type="havok/widget/Carousel">
                <li class="active" title="First Thumbnail label">
                    <img alt="" src="assets/img/bootstrap-mdo-sfmoma-01.jpg">
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                </li>
                <li title="Second Thumbnail label">
                    <img alt="" src="assets/img/bootstrap-mdo-sfmoma-02.jpg">
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                </li>
                <li title="Third Thumbnail label">
                    <img alt="" src="assets/img/bootstrap-mdo-sfmoma-03.jpg">
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                </li>
            </ol>
          </div>
<pre class="prettyprint linenums">

</pre>

          <div class="bs-docs-example">
            <ol data-dojo-type="havok/widget/Carousel"
                data-dojo-props="
                active: 2,
                store: {
                    data: [
                        {id: 0, title: 'First Thumbnail label', caption: 'caption 1', img: 'assets/img/bootstrap-mdo-sfmoma-01.jpg'},
                        {id: 1, title: 'Second Thumbnail label', caption: 'caption 2', img: 'assets/img/bootstrap-mdo-sfmoma-02.jpg'},
                        {id: 2, title: 'Third Thumbnail label', caption: 'caption 3', img: 'assets/img/bootstrap-mdo-sfmoma-03.jpg'}
                    ]
                }"
            ></ol>
          </div>
<pre class="prettyprint linenums">

</pre>

        </section>
