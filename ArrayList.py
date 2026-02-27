class CharacterList:
    def __init__(self):
        self.data = []

    # Obtener elemento por índice
    def __getitem__(self, index):
        if index < 0 or index >= len(self.data):
            raise IndexError("Index does not exist")
        return self.data[index]

    # Permitir uso en for loop
    def __iter__(self):
        return iter(self.data)

    # Verificar existencia de un elemento
    def __contains__(self, element):
        return element in self.data

    # Agregar al final
    def append(self, element):
        self.data.append(element)

    # Insertar en índice
    def insert(self, index, element):
        if index < 0 or index > len(self.data):
            raise IndexError("Index does not exist in the collection")
        self.data.insert(index, element)

    # Eliminar por valor
    def remove(self, element):
        if element not in self.data:
            raise ValueError("Element does not exist in the collection")
        self.data.remove(element)

    # Eliminar y devolver por índice
    def pop(self, index):
        if index < 0 or index >= len(self.data):
            raise IndexError("Index does not exist in the collection")
        return self.data.pop(index)

    # Limpiar lista
    def clear(self):
        self.data.clear()

GenshinCharacter = CharacterList()

GenshinCharacter.append("Venti")
GenshinCharacter.append("Aether")
GenshinCharacter.append("Xiao")
GenshinCharacter.append("Zhongli")
print("Lista inicial:", list(GenshinCharacter))

GenshinCharacter.insert(2, "Hu Tao")
print("Después de insert en índice 2:", list(GenshinCharacter))

print("¿Existe 'Xiao'?: ", "Xiao" in GenshinCharacter)

print("Personaje en índice 3: ", GenshinCharacter[3])

GenshinCharacter.remove("Hu Tao")
print("Después de remove('Hu Tao'):", list(GenshinCharacter))

print("Elemento eliminado con pop(1):", GenshinCharacter.pop(1))
print("Después de pop:", list(GenshinCharacter))

GenshinCharacter.clear()
print("Después de clear:", list(GenshinCharacter))