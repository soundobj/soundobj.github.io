/**
 * Manages the User's Items to be purchased: 
 * users can add and delete items
 * a total amount is updated upon user editing of the cart.
 * @param  {Object} $scope Angular Scope
 */
function shoppingCartController($scope) {
    // items to be purchase by the user
    $scope.invoice = {
        items: []
    };
    // store items for sale
    $scope.goods = [
        {
            description:"blue jumper",
            cost:300,
            qty: 1
        },
        {
            description:"white shirt",
            cost:200,
            qty: 1
        },
        {
            description:"pink shoes",
            cost:100,
            qty: 1
        }
    ];
    /**
     * Adds a new item to a cart or updates the quantitiy if the item already exists 
     * @param {Object} item a purchasable item
     */
    $scope.addItem = function(item) {
        var cartItemIndex = $scope.checkItemIsInCart(item.description);
        if(cartItemIndex != undefined) {
            $scope.invoice.items[cartItemIndex].qty++;
        } else {
            $scope.invoice.items.push(item);
       }
    },
    /**
     * removes an items from the cart
     * @param  {Integer} index where in the invoice items the item to be deleted is stored
     */
    $scope.removeItem = function(index) {
        $scope.invoice.items.splice(index, 1);
    },
    /**
     * Checks if an item has already been added to the cart 
     * @param  {String} description the item name
     * @return {Integer}             the index of the item in the cart or undefined
     */
    $scope.checkItemIsInCart = function(description){
        for(var i = 0; i < $scope.invoice.items.length; i++) {
            if ($scope.invoice.items[i].description === description) {
                return i;
            }
        }
        return undefined;
    },
    /**
     * Calculates the total cost of items to be purchased
     */
    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.invoice.items, function(item) {
            total += item.qty * item.cost;
        })
        return total;
    }
}