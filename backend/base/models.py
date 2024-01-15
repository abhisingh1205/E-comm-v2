from django.db import models
import random
import string

# Create your models here.
class Category(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=255, blank=True)
    desc = models.TextField(blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    modifiedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class Inventory(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    quantity = models.IntegerField()
    createdAt = models.DateTimeField(auto_now_add=True)
    modifiedAt = models.DateTimeField(auto_now=True)


class Product(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=255, null=False)
    image = models.ImageField(null=True, blank=True, default='/product_images/placeholder.jpg', upload_to='product_images/')
    brand = models.CharField(max_length=200, null=True, blank=True)
    SKU = models.CharField(max_length=100, null=True, blank=True)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    quantity_id = models.ForeignKey(Inventory, on_delete=models.CASCADE)

    createdAt = models.DateTimeField(auto_now_add=True)
    modifiedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    def generate_random_alphanumeric(self, length):
        characters = string.ascii_letters + string.digits
        random_word = ''.join(random.choice(characters) for _ in range(length))
        
        return random_word
    
    def save(self, *args, **kwargs):
        if not self.SKU:
            self.SKU = self.generate_random_alphanumeric(8)
        
        super().save(*args, **kwargs)

    
