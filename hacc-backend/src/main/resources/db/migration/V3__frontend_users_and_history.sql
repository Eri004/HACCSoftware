UPDATE unidad SET codigo='B-104' WHERE id_unidad=3;

UPDATE cargo SET saldo=total,estado='PENDIENTE' WHERE id_unidad=3 AND anio=2026 AND mes=10;

UPDATE usuario SET username='admin@hacc.com',email='admin@hacc.com',password_hash='20e18d63ded820fa987661177167b71ea7a2fd828d5ddb0cc513a77fffce0115',id_persona=NULL WHERE id_usuario=1;
UPDATE usuario SET username='residente1@hacc.com',email='residente1@hacc.com',password_hash='277da568f86a13a1b7a248e4fda797dfff606165653a61cb131ad8f237342ad9',id_persona=1 WHERE id_usuario=2;
INSERT INTO usuario(id_usuario,id_persona,id_rol,username,password_hash,email,estado)
VALUES (3,3,2,'residente2@hacc.com','277da568f86a13a1b7a248e4fda797dfff606165653a61cb131ad8f237342ad9','residente2@hacc.com','ACTIVO');

INSERT INTO cargo(id_unidad,id_persona,anio,mes,numero_cargo,fecha_vencimiento,total,saldo,estado)
SELECT c.id_unidad,c.id_persona,2026,period.periodo_mes,
       'CRG-2026-'||lpad(period.periodo_mes::text,2,'0')||'-'||right(c.numero_cargo,2),
       make_date(2026,period.periodo_mes,5),c.total,0,'PAGADO'
FROM cargo c CROSS JOIN (VALUES (8),(9)) AS period(periodo_mes)
WHERE c.anio=2026 AND c.mes=10;

INSERT INTO detalle_cargo(id_cargo,id_alicuota,id_rubro,tipo_concepto,descripcion,cantidad,valor_unitario,subtotal)
SELECT new.id_cargo,d.id_alicuota,d.id_rubro,d.tipo_concepto,d.descripcion,d.cantidad,d.valor_unitario,d.subtotal
FROM detalle_cargo d
JOIN cargo old ON old.id_cargo=d.id_cargo AND old.mes=10 AND old.anio=2026
JOIN cargo new ON new.id_unidad=old.id_unidad AND new.anio=2026 AND new.mes IN (8,9);

SELECT setval(pg_get_serial_sequence('usuario','id_usuario'),3);
