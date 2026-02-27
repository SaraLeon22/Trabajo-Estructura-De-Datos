class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self, initial_elements=None):
        self.head = None
        if initial_elements is None:
            initial_elements = []
        for element in initial_elements:
            self.append(element)

    def __str__(self):
        elementos = []
        actual = self.head
        while actual:
            elementos.append(str(actual.data))
            actual = actual.next
        return "[" + ", ".join(elementos) + "]"

    def __len__(self):
        contador = 0
        actual = self.head
        while actual:
            contador += 1
            actual = actual.next
        return contador

    def __getitem__(self, index):
        if index < 0:
            raise IndexError("Error: the index dont exist")
        actual = self.head
        posicion_actual = 0
        while actual is not None:
            if posicion_actual == index:
                return actual.data
            actual = actual.next
            posicion_actual += 1
        raise IndexError("Error: the index dont exist")

    def isEmpty(self):
        return self.head is None

    def __iter__(self):
        actual = self.head
        while actual:
            yield actual.data
            actual = actual.next

    def __contains__(self, element):
        actual = self.head
        while actual:
            if actual.data == element:
                return True
            actual = actual.next
        return False

    def append(self, element):
        nuevo_nodo = Node(element)
        if self.head is None:
            self.head = nuevo_nodo
            return
        ultimo = self.head
        while ultimo.next:
            ultimo = ultimo.next
        ultimo.next = nuevo_nodo

    def insert(self, index, element):
        if index < 0:
            raise IndexError("Error: non existing index in the collection")

        nuevo_nodo = Node(element)
        if index == 0:
            nuevo_nodo.next = self.head
            self.head = nuevo_nodo
            return

        actual = self.head
        for _ in range(index - 1):
            if actual is None:
                raise IndexError("Error: non existing index in the collection")
            actual = actual.next

        if actual is None:
            raise IndexError("Error: non existing index in the collection")

        nuevo_nodo.next = actual.next
        actual.next = nuevo_nodo

    def remove(self, element):
        actual = self.head
        previo = None
        while actual:
            if actual.data == element:
                if previo:
                    previo.next = actual.next
                else:
                    self.head = actual.next
                return
            previo = actual
            actual = actual.next
        raise ValueError("Error: the element dont exist in the collection")

    def pop(self, index):
        if index < 0:
            raise IndexError("Error: non existing index in the collection")

        actual = self.head
        previo = None

        for _ in range(index):
            if actual is None:
                raise IndexError("Error: non existing index in the collection")
            previo = actual
            actual = actual.next

        if actual is None:
            raise IndexError("Error: non existing index in the collection")

        if previo:
            previo.next = actual.next
        else:
            self.head = actual.next

        return actual.data

    def clear(self):
        self.head = None

if __name__ == "__main__":
    equipo = LinkedList(["Barbatos", "Morax", "Beelzebul"])
    equipo.append("Buer")
    equipo.insert(2, "Focalors")
    print("Equipo:", equipo)

    equipo.remove("Morax")
    eliminado = equipo.pop(1)
    print(f"Sin Morax ni {eliminado}:", equipo)

    equipo.clear()
