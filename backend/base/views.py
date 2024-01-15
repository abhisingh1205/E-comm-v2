from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from .models import Product, Inventory, Category
from .serializers import ProductListSerialzier, CategorySerializer, ProductCreateSerializer
from account.renderers import UserRenderer
import json
# Create your views here.


class ProductsListView(APIView):
    parser_classes = [FormParser, MultiPartParser]
    def get(self, request, *args, **kwargs):
        try:
            products = Product.objects.all()
            serializer = ProductListSerialzier(products, many=True)
        
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response({'errors': {'non_field_errors': ['Interal server error']}}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, *args, **Kwargs):
        serializer = ProductCreateSerializer(data=request.data)
        if serializer.is_valid():
            print("Is valid")
            serializer.save()
            return Response({'msg': 'Product is created!'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'errors': {'non_field_errors': ['Unable to create product']}}, status=status.HTTP_400_BAD_REQUEST)
        

class ProductDetailView(APIView):
    renderer_classes = [UserRenderer]
    def get(self, request, pk, *args, **kwargs):
        product = Product.objects.get(id=pk)
        serializer = ProductListSerialzier(product)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryDetailView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, *args, **kwargs):
        serializer = CategorySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'errors': {'non_field_errors': ['Unable to create category']}}, status=status.HTTP_400_BAD_REQUEST)
    
class CategoryListView(APIView):
    renderer_classes = [UserRenderer]

    def get(self, request, *args, **kwargs):
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)



    

