package com.Parcial2Cortez.app.Persona;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.Parcial2Cortez.app.Common.CommonEntity;
import com.Parcial2Cortez.app.Domicilio.DomicilioEntity;

@Entity
@Table(name = "Persona")
public class PersonaEntity extends CommonEntity implements Serializable {
	
	private static final long serialVersionUID = -1034118546506335502L;
	
	private String nombre;
	private String apellido;
	private long telefono;
	
	@OneToOne(cascade = CascadeType.ALL, optional = false)
	@JoinColumn(name = "domicilio_id", nullable = false)
	private DomicilioEntity domicilio;




	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public long getTelefono() {
		return telefono;
	}

	public void setTelefono(long telefono) {
		this.telefono = telefono;
	}

	public DomicilioEntity getDomicilio() {
		return domicilio;
	}

	public void setDomicilio(DomicilioEntity domicilio) {
		this.domicilio = domicilio;
	}
	
}
