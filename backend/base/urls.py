from django.urls import path
from .views import ProductsListView, ProductDetailView, CategoryDetailView, CategoryListView


urlpatterns = [
    path('products/', ProductsListView.as_view(), name="product"),
    path('product/<str:pk>', ProductDetailView.as_view(), name="product-detail"),
    path('category/', CategoryDetailView.as_view(), name="category-detail"),
    path('categories/', CategoryListView.as_view(), name="category-list"),
]