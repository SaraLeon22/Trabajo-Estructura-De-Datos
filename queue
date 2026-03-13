class Queue:
    
    # initial_elements: permite que la colección comience con algunos elementos
    def __init__(self, initial_elements=None):
        # Es mejor usar None por defecto para evitar problemas con listas mutables
        if initial_elements is None:
            self.items = []
        else:
            self.items = list(initial_elements)
    
    # devuelve un str de la colección
    def __str__(self):
        return str(self.items)
    
    # devuelve la longitud de los elementos en la colección
    def __len__(self):
        return len(self.items)
    
    # devuelve un booleano que indica si la colección está vacía o no
    def isEmpty(self):
        return len(self.items) == 0
    
    # devuelve el siguiente elemento en la colección (el frente) sin eliminarlo
    def peek(self):
        if self.isEmpty():
            return None
        return self.items[0]
    
    # permite que la colección sea llamada en un bucle for
    def __iter__(self):
        return iter(self.items)
    
    # devuelve un valor booleano que representa la existencia de un elemento
    def __contains__(self, element):
        return element in self.items
    
    # agrega el elemento a la colección (al final)
    def push(self, element):
        self.items.append(element)
    
    # elimina y devuelve el siguiente elemento (el frente)
    # Nota: ignoramos 'index' porque en una cola estándar siempre sale el primero
    def pop(self, index=0):
        if self.isEmpty():
            raise IndexError("pop from empty queue")
        return self.items.pop(0)

# --- Ejemplo de uso ---
cola = Queue([1, 2, 3])
cola.push(4)

print(f"Cola actual: {cola}")
print(f"Siguiente (peek): {cola.peek()}")
print(f"¿Contiene el 2?: {2 in cola}")
print(f"Elemento eliminado: {cola.pop()}")
print(f"Largo de la cola: {len(cola)}")
