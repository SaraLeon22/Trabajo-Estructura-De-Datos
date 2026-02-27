class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def isEmpty(self):
        return self.head is None

    def __iter__(self):
        current = self.head
        while current:
            yield current.data
            current = current.next

    def __contains__(self, element):
        current = self.head
        while current:
            if current.data == element:
                return True
            current = current.next
        return False

    def append(self, element):
        new_node = Node(element)
        if self.head is None:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def insert(self, index, element):
        if index < 0:
            raise IndexError("Index does not exist in the collection")
        new_node = Node(element)
        if index == 0:
            new_node.next = self.head
            self.head = new_node
            return
        current = self.head
        for i in range(index - 1):
            if current is None:
                raise IndexError("Index does not exist in the collection")
            current = current.next
        new_node.next = current.next
        current.next = new_node

    def remove(self, element):
        current = self.head
        prev = None
        while current:
            if current.data == element:
                if prev:
                    prev.next = current.next
                else:
                    self.head = current.next
                return
            prev = current
            current = current.next
        raise ValueError("Element does not exist in the collection")

    def pop(self, index):
        if index < 0:
            raise IndexError("Index does not exist in the collection")
        current = self.head
        prev = None
        for i in range(index):
            if current is None:
                raise IndexError("Index does not exist in the collection")
            prev = current
            current = current.next
        if current is None:
            raise IndexError("Index does not exist in the collection")
        if prev:
            prev.next = current.next
        else:
            self.head = current.next
        return current.data

    def clear(self):
        self.head = None

LinkedCharacter = LinkedList()

print("¿Está vacía?", LinkedCharacter.isEmpty())

LinkedCharacter.append("Barbatos")
LinkedCharacter.append("Morax")
LinkedCharacter.append("Focalors")
LinkedCharacter.append("Beelzebul")
print("Lista inicial:", list(LinkedCharacter))

LinkedCharacter.insert(2, "Istaroth")
print("Después de insert en índice 2:", list(LinkedCharacter))

print("¿Existe 'Beelzebul'?:", "Beelzebul" in LinkedCharacter)

LinkedCharacter.remove("Istaroth")
print("Después de remove('Istaroth'):", list(LinkedCharacter))

print("Elemento eliminado con pop(1):", LinkedCharacter.pop(1))
print("Después de pop:", list(LinkedCharacter))

LinkedCharacter.clear()
print("Después de clear:", list(LinkedCharacter))
