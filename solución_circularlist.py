

class Node:

    def __init__(self, value):
        self.value = value
        self.next = None

class CircularList:

    def __init__(self, initial_elements=None):
        self.head = None
        self.tail = None
        self._size = 0

        if initial_elements is not None:
            for element in initial_elements:
                self.append(element)

    def __str__(self):
        if self.isEmpty():
            return "[]"
        elementos = []
        actual = self.head
        for _ in range(self._size):
            elementos.append(str(actual.value))
            actual = actual.next
        return "[" + ", ".join(elementos) + "]"

    def __len__(self):
        return self._size

    def __getitem__(self, index):
        if index < 0 or index >= self._size:
            raise IndexError("Error: the index dont exist")
        actual = self.head
        for _ in range(index):
            actual = actual.next
        return actual.value

    def isEmpty(self):
        return self._size == 0

    def __iter__(self):
        actual = self.head
        for _ in range(self._size):
            yield actual.value
            actual = actual.next

    def __contains__(self, element):
        actual = self.head
        for _ in range(self._size):
            if actual.value == element:
                return True
            actual = actual.next
        return False

    def append(self, element):
        nuevo_nodo = Node(element)
        if self.isEmpty():
            self.head = nuevo_nodo
            self.tail = nuevo_nodo
            nuevo_nodo.next = self.head
        else:
            self.tail.next = nuevo_nodo
            self.tail = nuevo_nodo
            self.tail.next = self.head
        self._size += 1

    def add(self, index, element):
        if index < 0 or index > self._size:
            raise IndexError("Error: the index dont exist")

        if index == self._size:
            self.append(element)
            return

        nuevo_nodo = Node(element)
        if index == 0:
            nuevo_nodo.next = self.head
            self.head = nuevo_nodo
            self.tail.next = self.head
        else:
            actual = self.head
            for _ in range(index - 1):
                actual = actual.next
            nuevo_nodo.next = actual.next
            actual.next = nuevo_nodo
        self._size += 1

    def remove(self, element):
        if self.isEmpty():
            raise ValueError("Error: the element dont exist in the collection")

        actual = self.head
        previo = self.tail

        for _ in range(self._size):
            if actual.value == element:
                if self._size == 1:
                    self.head = None
                    self.tail = None
                elif actual == self.head:
                    self.head = actual.next
                    self.tail.next = self.head
                elif actual == self.tail:
                    previo.next = self.head
                    self.tail = previo
                else:
                    previo.next = actual.next
                self._size -= 1
                return
            previo = actual
            actual = actual.next

        raise ValueError("Error: the element dont exist in the collection")

    def pop(self, index):
        if index < 0 or index >= self._size:
            raise IndexError("Error: the index dont exist")

        actual = self.head
        previo = self.tail

        for _ in range(index):
            previo = actual
            actual = actual.next

        valor_retorno = actual.value

        if self._size == 1:
            self.head = None
            self.tail = None
        elif actual == self.head:
            self.head = actual.next
            self.tail.next = self.head
        elif actual == self.tail:
            previo.next = self.head
            self.tail = previo
        else:
            previo.next = actual.next

        self._size -= 1
        return valor_retorno

    def clear(self):
        self.head = None
        self.tail = None
        self._size = 0

if __name__ == "__main__":
    print("INICIANDO SISTEMAS DEL DESTRUCTOR ")


    estratagemas = CircularList(["Águila: Bomba de 500 kg", "Ataque Orbital de Precisión", "Mochila propulsora"])
    print(" Equipamiento inicial:", estratagemas)

    print(" Estratagemas disponibles:", len(estratagemas), "/ 4")

    estratagemas.append("Cañón automático")
    print(" Después de solicitar el Cañón automático:", estratagemas)

    estratagemas.add(1, "Refuerzo")
    print(" Prioridad máxima, Refuerzo añadido al inicio:", estratagemas)

    print(" Estratagema en la ranura 2:", estratagemas[2])

    print(" ¿Llevamos el Láser Orbital?:", "Láser Orbital" in estratagemas)

    estratagemas.remove("Mochila propulsora")
    print(" Mochila propulsora descartada:", estratagemas)

    lanzada = estratagemas.pop(0)
    print(f" ¡Desplegando: {lanzada}!")
    print("Inventario actual:", estratagemas)

    print(" Repasando estratagemas en espera:")
    for estratagema in estratagemas:
        print(f" -> Lista para lanzar: {estratagema}")

    estratagemas.clear()
    print(" Extracción completada.")
    print("¿Inventario vacío?:", estratagemas.isEmpty())
    print(" Loadout final:", estratagemas)
