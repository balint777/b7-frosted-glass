[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@chronos/b7-frosted-glass)

<!--
```
<custom-element-demo>
	<template>
		<script type="module" src="./src/index.js"></script>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mailtoharshit/San-Francisco-Font-/sanfrancisco.css"/>

		<next-code-block></next-code-block>
	</template>
</custom-element-demo>
```
-->
```html
<style>
#menubar {
	padding: 1em 3em;
	top: 0;
	left: 0;
	width: 100vw;
	position: fixed;
	display: flex;
	height: 5em;
	font-family: 'San Francisco', Helvetica, Arial, sans-serif;
	box-shadow: 0 0 1em hsla(0, 0%, 0%, 0.2);
	--frosted-glass-tint: hsla(0, 0%, 100%, 0.3);
	--frosted-glass-blur-radius: 5rem;
}

h1 {
	font-weight: 100;
}

#content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10em 5em;
}

#content img {
	max-width: 80vw;
	margin: 3rem;
}
</style>
<b7-frosted-glass-container id="container">
	<b7-frosted-glass id="menubar">
		<h1>Frosted Glass</h1>
	</b7-frosted-glass>
	<div id="content">
		<h1>Lorem ipsum</h1>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin condimentum diam id aliquam congue. Duis nibh diam, tempus ut sollicitudin vitae, suscipit et nulla. Nulla ut convallis arcu, nec congue dolor. Duis vel urna molestie, interdum leo a, tempus augue. Donec id neque luctus, tincidunt enim ac, convallis est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam in dui leo. Nunc pharetra tristique dui, sit amet ornare magna sodales et. Morbi bibendum orci at erat varius, non dictum dui vulputate. Vestibulum ultricies pharetra tellus at semper. In hac habitasse platea dictumst. Ut eu augue vel tellus mollis feugiat a id ipsum. Sed id faucibus sapien, id vehicula risus. In urna nisl, feugiat pellentesque leo quis, dapibus bibendum mauris. Aliquam non tristique augue. Nulla malesuada, lacus nec vestibulum commodo, ligula erat commodo nulla, commodo porttitor tellus odio eget mi.</p>
		<img src="https://placekitten.com/1000/480"/>
		<p>Nullam efficitur sodales lectus, consequat suscipit odio rhoncus sit amet. Sed maximus magna sit amet sapien sodales mollis. Aliquam quis tristique felis. Morbi sed ligula nec ligula porttitor tempor non eget libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut dignissim fermentum ipsum eget posuere. Nullam neque est, ultricies ac egestas at, laoreet vitae ex. Fusce suscipit odio vel sapien tincidunt, sed pulvinar ligula interdum. Proin sit amet posuere odio.</p>
		<p>Suspendisse ut posuere lectus. Nam sit amet sem nec lacus porta condimentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed vehicula tempor convallis. Aenean tempus sagittis neque et rhoncus. Ut augue massa, porttitor malesuada faucibus et, lobortis vitae ante. Praesent luctus sollicitudin elit. Duis congue diam nisl, ut dapibus sapien pellentesque eget. Proin turpis nunc, ultrices quis fringilla in, bibendum eu massa. Ut gravida mi sit amet venenatis pellentesque. Integer blandit nisl dui, non consectetur leo ornare in. Morbi ipsum dolor, lobortis sit amet ligula et, faucibus commodo dui.</p>
		<p>Nulla convallis quis odio sed cursus. Aenean imperdiet consectetur dui, in tristique ex pulvinar at. Praesent elementum faucibus odio. Nunc convallis, odio nec vulputate pharetra, mauris eros elementum massa, id rutrum ligula turpis sollicitudin lacus. Etiam sem metus, posuere quis augue et, vehicula tempus sem. Mauris elit leo, eleifend a bibendum ac, dapibus a dolor. Cras bibendum rhoncus felis, id luctus dui. Phasellus semper neque id velit sollicitudin fringilla. Ut nec velit et nibh ornare aliquam. Vestibulum malesuada ante sed neque semper laoreet. Sed at venenatis ipsum. Vivamus eu eros semper, molestie nulla eget, rutrum leo. Aliquam ullamcorper eros turpis, eget blandit nibh interdum vel. Ut sit amet enim a felis egestas tempor.</p>
		<img src="https://placekitten.com/1000/500"/>
		<p>Nullam efficitur sodales lectus, consequat suscipit odio rhoncus sit amet. Sed maximus magna sit amet sapien sodales mollis. Aliquam quis tristique felis. Morbi sed ligula nec ligula porttitor tempor non eget libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut dignissim fermentum ipsum eget posuere. Nullam neque est, ultricies ac egestas at, laoreet vitae ex. Fusce suscipit odio vel sapien tincidunt, sed pulvinar ligula interdum. Proin sit amet posuere odio.</p>
		<p>Suspendisse ut posuere lectus. Nam sit amet sem nec lacus porta condimentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed vehicula tempor convallis. Aenean tempus sagittis neque et rhoncus. Ut augue massa, porttitor malesuada faucibus et, lobortis vitae ante. Praesent luctus sollicitudin elit. Duis congue diam nisl, ut dapibus sapien pellentesque eget. Proin turpis nunc, ultrices quis fringilla in, bibendum eu massa. Ut gravida mi sit amet venenatis pellentesque. Integer blandit nisl dui, non consectetur leo ornare in. Morbi ipsum dolor, lobortis sit amet ligula et, faucibus commodo dui.</p>
		<p>Nulla convallis quis odio sed cursus. Aenean imperdiet consectetur dui, in tristique ex pulvinar at. Praesent elementum faucibus odio. Nunc convallis, odio nec vulputate pharetra, mauris eros elementum massa, id rutrum ligula turpis sollicitudin lacus. Etiam sem metus, posuere quis augue et, vehicula tempus sem. Mauris elit leo, eleifend a bibendum ac, dapibus a dolor. Cras bibendum rhoncus felis, id luctus dui. Phasellus semper neque id velit sollicitudin fringilla. Ut nec velit et nibh ornare aliquam. Vestibulum malesuada ante sed neque semper laoreet. Sed at venenatis ipsum. Vivamus eu eros semper, molestie nulla eget, rutrum leo. Aliquam ullamcorper eros turpis, eget blandit nibh interdum vel. Ut sit amet enim a felis egestas tempor.</p>
	</div>
</b7-frosted-glass-container>
```