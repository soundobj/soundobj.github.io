---
layout: null
title: Angular Shopping Cart
permalink: /shopping-cart/
---
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>

<script type="text/javascript" src="{{ "/js/shoppingCartController.js" | prepend: site.baseurl }}"></script>
<script>
var app = angular.module('app', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});
</script>
<body ng-app='app'>
    <div ng-controller="shoppingCartController">
        <table>
            <tr> 
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
            <tr ng:repeat="item in invoice.items">
                <td>// item.description //</td>      
                <td>// item.cost //</td>
                <td><input type="number" min="0" ng:model="item.qty"></td>            
                <td>// item.qty * item.cost | currency //</td>
                <td>[<a href ng:click="removeItem($index)">X</a>]</td>
            </tr>
            <tr>    
                <td colspan="3"></td>
                <td>// total() | currency //</td>
            </tr>
        </table>

        <div ng:repeat="item in goods">
            <div>
                <span><a href ng:click="addItem(item)">add item</a></span>
                <span>// item.description //</span>
                <span>// item.cost //</span>
            </div>
        </div>
    </div>
</body>