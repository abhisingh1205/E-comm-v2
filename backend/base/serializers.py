from rest_framework import serializers
from .models import Product, Inventory, Category
import json

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'desc']

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ['id','quantity']

class ProductListSerialzier(serializers.ModelSerializer):
    category_id = CategorySerializer()
    quantity_id = InventorySerializer()
    class Meta:
        model = Product
        fields = '__all__'

'''
class ProductCreateSerializer(serializers.ModelSerializer):
    category_id = CategorySerializer()
    quantity_id = InventorySerializer()

    class Meta:
        model = Product
        fields = ["id", "name", "brand", "image", "price", "category_id", "quantity_id"]
    
    
    def create(self, validated_data):
        print("Validated data = ", validated_data)
        #category = validated_data.pop('category_id', None)
        #category = Category.objects.get(name=category['name'])
        category = Category.objects.get(name=validated_data.get('category_id')['name'])

        #inventory_qty = validated_data.pop('quantity_id', None)
        #inventory = Inventory.objects.create(quantity=inventory_qty['quantity'])

        inventory = Inventory.objects.create(quantity=validated_data.get('quantity_id')['quantity'])

        return Product.objects.create(category_id=category, quantity_id=inventory, name=validated_data.get('name'))
    
'''

class ProductCreateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    brand = serializers.CharField(max_length=200)
    price = serializers.DecimalField(max_digits=7, decimal_places=2)
    image = serializers.ImageField()
    category_name = serializers.CharField(max_length=200)
    qty = serializers.IntegerField()

    def create(self, validated_data):
        category = Category.objects.get(name=validated_data.get('category_name'))
        inventory = Inventory.objects.create(quantity=validated_data.get('qty'))

        return Product.objects.create(category_id=category, quantity_id=inventory, name=validated_data.get("name"),\
                                    image=validated_data.get("image"), brand=validated_data.get('brand'), price=validated_data.get('price'))