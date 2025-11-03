#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para actualizar las noticias del sindicato ATRM semanalmente.

Uso:
python actualizar_noticias.py

Este script:
1. Lee el archivo actual de datos
2. Permite añadir nuevas noticias
3. Archiva noticias antiguas (opcional)
4. Actualiza el archivo JSON
5. Puede hacer commit automático si se ejecuta en el repo
"""

import json
import os
from datetime import datetime

def cargar_datos():
    """Carga los datos actuales del sindicato"""
    try:
        with open('data/atrm_sindicato_data.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print("❌ No se encontró el archivo de datos. ¿Estás en la raíz del repositorio?")
        return None
    except json.JSONDecodeError:
        print("❌ Error al leer el archivo JSON. Verifica el formato.")
        return None

def mostrar_noticias_actuales(data):
    """Muestra las noticias actuales"""
    print("\n📰 NOTICIAS ACTUALES:")
    print("-" * 50)
    for i, noticia in enumerate(data['noticias'], 1):
        print(f"{i}. {noticia['fecha']} - {noticia['titulo']}")
        print(f"   Fuente: {noticia['fuente']}")
    print("-" * 50)

def añadir_noticia(data):
    """Añade una nueva noticia"""
    print("\n➕ AÑADIR NUEVA NOTICIA")
    
    fecha = input("Fecha (DD de mes de YYYY): ").strip()
    if not fecha:
        meses = {"01": "enero", "02": "febrero", "03": "marzo", "04": "abril", "05": "mayo", "06": "junio", "07": "julio", "08": "agosto", "09": "septiembre", "10": "octubre", "11": "noviembre", "12": "diciembre"}
        hoy = datetime.now()
        mes_actual = meses[hoy.strftime("%m")]
        fecha = f"{hoy.day} de {mes_actual} de {hoy.year}"
    
    titulo = input("Título de la noticia: ").strip()
    if not titulo:
        print("❌ El título es obligatorio")
        return False
    
    contenido = input("Contenido/descripción: ").strip()
    if not contenido:
        print("❌ El contenido es obligatorio")
        return False
    
    fuente = input("Fuente (ej. BORM nº X, CCOO Murcia, ATRM): ").strip()
    if not fuente:
        print("❌ La fuente es obligatoria")
        return False
    
    nueva_noticia = {
        "fecha": fecha,
        "titulo": titulo,
        "contenido": contenido,
        "fuente": fuente
    }
    
    # Insertar al principio (más reciente primero)
    data['noticias'].insert(0, nueva_noticia)
    print(f"✅ Noticia añadida: {titulo}")
    return True

def archivar_noticias_antiguas(data, max_noticias=10):
    """Archiva noticias antiguas manteniendo solo las más recientes"""
    if len(data['noticias']) > max_noticias:
        archivadas = data['noticias'][max_noticias:]
        data['noticias'] = data['noticias'][:max_noticias]
        
        # Guardar archivadas en archivo separado
        try:
            with open('data/noticias_archivadas.json', 'r', encoding='utf-8') as f:
                archivo_completo = json.load(f)
        except FileNotFoundError:
            archivo_completo = {"noticias_archivadas": []}
        
        archivo_completo["noticias_archivadas"].extend(archivadas)
        
        with open('data/noticias_archivadas.json', 'w', encoding='utf-8') as f:
            json.dump(archivo_completo, f, ensure_ascii=False, indent=2)
        
        print(f"📦 {len(archivadas)} noticias archivadas en noticias_archivadas.json")
    
    return data

def guardar_datos(data):
    """Guarda los datos actualizados"""
    try:
        with open('data/atrm_sindicato_data.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print("💾 Datos guardados correctamente")
        return True
    except Exception as e:
        print(f"❌ Error al guardar: {e}")
        return False

def main():
    print("🔧 ACTUALIZADOR DE NOTICIAS - SINDICATO ATRM")
    print("=" * 50)
    
    # Cargar datos actuales
    data = cargar_datos()
    if not data:
        return
    
    # Mostrar noticias actuales
    mostrar_noticias_actuales(data)
    
    while True:
        print("\n¿Qué quieres hacer?")
        print("1. ➕ Añadir nueva noticia")
        print("2. 📦 Archivar noticias antiguas (mantener 10 más recientes)")
        print("3. 👀 Ver noticias actuales")
        print("4. 💾 Guardar y salir")
        print("5. ❌ Salir sin guardar")
        
        opcion = input("\nElige una opción (1-5): ").strip()
        
        if opcion == "1":
            añadir_noticia(data)
        elif opcion == "2":
            data = archivar_noticias_antiguas(data)
        elif opcion == "3":
            mostrar_noticias_actuales(data)
        elif opcion == "4":
            if guardar_datos(data):
                print("\n✅ ¡Actualización completada!")
                print("🌐 Recuerda hacer git add, commit y push para actualizar la web")
            break
        elif opcion == "5":
            print("❌ Saliendo sin guardar cambios")
            break
        else:
            print("❌ Opción no válida")

if __name__ == "__main__":
    main()
